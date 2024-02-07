package com.ssafy.server.service.implement;

import com.google.firebase.auth.UserInfo;
import com.ssafy.server.dto.websocket.MemberInfoDto;
import com.ssafy.server.dto.websocket.TruthRoomDto;
import com.ssafy.server.service.EnterRoomService;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class EnterRoomServiceImpl implements EnterRoomService {
    //현재 진실의 방이 진행되고 있는 방들 정보
    private final Map<Integer, TruthRoomDto> truthRooms = new ConcurrentHashMap<>();

    //sessionId가 어느 방에 위치해 있는지 알려줄 Map
    private final Map<String, Integer> sessionRoomMap = new ConcurrentHashMap<>();

    @Override
    public TruthRoomDto createOrGetRoom(Integer roomId) {
        //방이 있다면 넣어주고 없다면 생성하고 넣어줌
        return truthRooms.computeIfAbsent(roomId, k -> new TruthRoomDto());
    }
    @Override
    public TruthRoomDto getRoom(Integer roomId) {
        return truthRooms.get(roomId); // roomId에 해당하는 방을 반환, 없으면 null 반환
    }
    @Override
    public void addMember(Integer roomId, String sessionId, String userName, String role) {
        TruthRoomDto room = createOrGetRoom(roomId);
        Map<String, MemberInfoDto> members = room.getMembers();
        MemberInfoDto dto = new MemberInfoDto(userName, role);
        members.put(sessionId, dto);
        System.out.println(members);
        room.getReadyState().put(sessionId, false);
        room.getEvidenceNextStage().put(sessionId, false);
        room.getFinalArgumentReadyState().put(sessionId, false);
        mapSessionToRoom(sessionId, roomId);
    }

    @Override
    public Map<String, MemberInfoDto> getRoomMembers(Integer roomId) {
        TruthRoomDto room = truthRooms.get(roomId);
        if (room != null) {
            return room.getMembers();
        }
        return Collections.emptyMap(); // 방이 존재하지 않는 경우 빈 맵 반환
    }

    @Override
    public void removeMember(Integer roomId, String sessionId) {
        TruthRoomDto room = truthRooms.get(roomId);
        if (room != null) {
            //멤버 지우기
            room.getMembers().remove(sessionId);
            room.getReadyState().remove(sessionId);
        }
    }

    @Override
    public void deleteRoom(Integer roomId) {
        truthRooms.remove(roomId);
    }

    @Override
    public void setMemberReady(Integer roomId, String sessionId, boolean isReady) {
        TruthRoomDto room = truthRooms.get(roomId);
        if (room != null && room.getReadyState().containsKey(sessionId)) {
            room.getReadyState().put(sessionId, isReady);
        }
    }

    @Override
    public Integer countMemberReady(Integer roomId) {
        TruthRoomDto room = truthRooms.get(roomId);
        long count = room.getReadyState().values().stream()
                .filter(Boolean::booleanValue)
                .count();
        return (int) count;
    }

    @Override
    public boolean areAllMemberReady(Integer roomId) {
        TruthRoomDto room = truthRooms.get(roomId);
        //모두 true 이면 true 반환
        return room != null &&
                room.getReadyState().values().stream().allMatch(Boolean::booleanValue);
    }

    @Override
    public boolean isRoomEmpty(Integer roomId) {
        TruthRoomDto room = truthRooms.get(roomId);
        return room != null && room.getMembers().isEmpty();
    }

    @Override
    // 세션 ID와 방 ID를 매핑하는 메소드
    public void mapSessionToRoom(String sessionId, Integer roomId) {
        sessionRoomMap.put(sessionId, roomId);
    }

    @Override
    // 세션 ID로 방 ID를 조회하는 메소드
    public Integer getRoomIdFromSession(String sessionId) {
        return sessionRoomMap.get(sessionId);
    }

    @Override
    // 세션 ID에 해당하는 매핑을 제거하는 메소드
    public void removeSessionFromRoomMap(String sessionId) {
        sessionRoomMap.remove(sessionId);
    }
}
