package com.ssafy.server.service.implement;

import com.google.firebase.auth.UserInfo;
import com.ssafy.server.common.ResponseCode;
import com.ssafy.server.dto.websocket.MemberInfoDto;
import com.ssafy.server.dto.websocket.TruthRoomDto;
import com.ssafy.server.entity.ChallengeEntity;
import com.ssafy.server.exception.CustomException;
import com.ssafy.server.exception.MembersNotFoundException;
import com.ssafy.server.exception.RoomNotFoundException;
import com.ssafy.server.repository.ChallengeRepository;
import com.ssafy.server.service.EnterRoomService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class EnterRoomServiceImpl implements EnterRoomService {

    private final ChallengeRepository challengeRepository;
    //현재 진실의 방이 진행되고 있는 방들 정보
    private final Map<Integer, TruthRoomDto> truthRooms = new ConcurrentHashMap<>();
    //sessionId가 어느 방에 위치해 있는지 알려줄 Map
    private final Map<String, Integer> sessionRoomMap = new ConcurrentHashMap<>();

    @Override
    @Transactional
    public TruthRoomDto createOrGetRoom(Integer roomId) {
        //방이 있다면 넣어주고 없다면 생성하고 넣어줌
        return truthRooms.computeIfAbsent(roomId, k -> new TruthRoomDto());
    }
    @Override
    @Transactional
    public TruthRoomDto getRoom(Integer roomId) {
        TruthRoomDto room = truthRooms.get(roomId);
        if (room == null) {
            throw new RoomNotFoundException();
        }
        return room;
    }
    @Override
    @Transactional
    public void addMember(Integer roomId, String sessionId, String userName, String role) {
        TruthRoomDto room = createOrGetRoom(roomId);
        Map<String, MemberInfoDto> members = room.getMembers();
        if (members == null) {
            throw new MembersNotFoundException();
        }
        boolean isReady = false;
        MemberInfoDto dto = new MemberInfoDto(userName, role,isReady);
        members.put(sessionId, dto);
        room.getReadyState().put(sessionId, false);
        room.getEvidenceNextStage().put(sessionId, false);
        room.getFinalArgumentReadyState().put(sessionId, false);
        mapSessionToRoom(sessionId, roomId);
    }

    @Override
    @Transactional
    public Map<String, MemberInfoDto> getRoomMembers(Integer roomId) {
        TruthRoomDto room = truthRooms.get(roomId);
        if (room == null) {
            throw new RoomNotFoundException();
        }
        return room.getMembers();
    }

    @Override
    @Transactional
    public void removeMember(Integer roomId, String sessionId) {
        TruthRoomDto room = truthRooms.get(roomId);
        if (room == null) {
            throw new RoomNotFoundException();
        }
        //멤버 지우기
        if(!room.getMembers().containsKey(sessionId)){
            throw new MembersNotFoundException();
        }
        room.getMembers().remove(sessionId);
        if (!room.getReadyState().remove(sessionId)){
            throw new CustomException(HttpStatus.BAD_REQUEST, ResponseCode.BAD_REQUEST, "해당 방에 준비상태가 없습니다.");
        }
        room.getReadyState().remove(sessionId);
    }

    @Override
    public void deleteRoom(Integer roomId) {
        truthRooms.remove(roomId);
    }

    @Override
    @Transactional
    public void setMemberReady(Integer roomId, String sessionId, boolean isReady) {
        TruthRoomDto room = truthRooms.get(roomId);
        if (room != null && room.getReadyState().containsKey(sessionId)) {
            room.getReadyState().put(sessionId, isReady);
            MemberInfoDto dto = room.getMembers().get(sessionId);
            dto.setReady(isReady);
        }
    }

    @Override
    @Transactional
    public Integer countMemberReady(Integer roomId) {
        TruthRoomDto room = truthRooms.get(roomId);
        long count = room.getReadyState().values().stream()
                .filter(Boolean::booleanValue)
                .count();
        return (int) count;
    }

    @Override
    @Transactional
    public boolean areAllMemberReady(Integer roomId) {
        TruthRoomDto room = truthRooms.get(roomId);
        //모두 true 이면 true 반환
        return room != null &&
                room.getReadyState().values().stream().allMatch(Boolean::booleanValue);
    }

    @Override
    @Transactional
    public boolean isRoomEmpty(Integer roomId) {
        TruthRoomDto room = truthRooms.get(roomId);
        return room != null && room.getMembers().isEmpty();
    }

    @Override
    @Transactional
    // 세션 ID와 방 ID를 매핑하는 메소드
    public void mapSessionToRoom(String sessionId, Integer roomId) {
        sessionRoomMap.put(sessionId, roomId);
    }

    @Override
    @Transactional
    // 세션 ID로 방 ID를 조회하는 메소드
    public Integer getRoomIdFromSession(String sessionId) {
        return sessionRoomMap.get(sessionId);
    }

    @Override
    @Transactional
    // 세션 ID에 해당하는 매핑을 제거하는 메소드
    public void removeSessionFromRoomMap(String sessionId) {
        sessionRoomMap.remove(sessionId);
    }

    @Override
    @Transactional
    public void setChallengeState(Integer challengeId, String status) {
        ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);
        challengeEntity.setStatus(status);
        //진실의 방 종료일을 바꿔주기
        challengeEntity.setFinalTruthRoomDate(LocalDateTime.now());
        challengeRepository.save(challengeEntity);
    }

}
