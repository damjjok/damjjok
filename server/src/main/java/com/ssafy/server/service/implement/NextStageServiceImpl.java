package com.ssafy.server.service.implement;

import com.ssafy.server.common.ResponseCode;
import com.ssafy.server.dto.websocket.TruthRoomDto;
import com.ssafy.server.exception.CustomException;
import com.ssafy.server.exception.RoomNotFoundException;
import com.ssafy.server.service.EnterRoomService;
import com.ssafy.server.service.NextStageService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NextStageServiceImpl implements NextStageService {

    private final EnterRoomService enterRoomService;

    @Override
    @Transactional
    public void setEvidenceNext(Integer roomId, String sessionId, boolean isNext) {
        TruthRoomDto room = enterRoomService.getRoom(roomId);
        if (room == null) {
            throw new RoomNotFoundException();
        }
        room.getEvidenceNextStage().put(sessionId, isNext);
    }

    @Override
    @Transactional
    public Integer countEvidenceNext(Integer roomId) {
        TruthRoomDto room = enterRoomService.getRoom(roomId); // 변경된 부분
        if (room == null) {
            throw new RoomNotFoundException();
        }
        long count = room.getEvidenceNextStage().values().stream()
                .filter(Boolean::booleanValue)
                .count();
        return (int) count;
    }

    @Override
    @Transactional
    public boolean checkAllEvidenceNextReady(Integer roomId) {
        TruthRoomDto room = enterRoomService.getRoom(roomId);
        if (room == null) {
            throw new RoomNotFoundException();
        }
        // 모든 참가자의 준비 상태가 true인지 확인
        return room.getEvidenceNextStage().values().stream()
                .allMatch(Boolean::booleanValue);
    }

    @Override
    @Transactional
    public void setFinalArgumentReady(Integer roomId, String sessionId, Boolean isReady) {
        TruthRoomDto room = enterRoomService.getRoom(roomId); // 변경된 부분
        if (room == null) {
            throw new RoomNotFoundException();
        }
        room.getFinalArgumentReadyState().put(sessionId, isReady);
    }

    @Override
    @Transactional
    public Integer countFinalArgumentReady(Integer roomId) {
        TruthRoomDto room = enterRoomService.getRoom(roomId);
        if (room == null) {
            throw new RoomNotFoundException();
        }
//        if (room.getFinalArgumentReadyState() == null) {
//            throw new CustomException(HttpStatus.BAD_REQUEST, ResponseCode.BAD_REQUEST, "이 방의 최후 변론 준비상태가 존재하지 않습니다.");
//        }
        // 준비 상태가 true로 설정된 참가자의 수를 계산
        long count = room.getFinalArgumentReadyState().values().stream()
                .filter(Boolean::booleanValue) // 준비 상태가 true인 경우만 필터링
                .count();
        return (int) count; // 계산된 수를 정수로 반환
    }


    @Override
    @Transactional
    public boolean checkAllFinalArgumentReady(Integer roomId) {
        TruthRoomDto room = enterRoomService.getRoom(roomId); // 변경된 부분
        if (room == null) {
            throw new RoomNotFoundException();
        }
        return room.getFinalArgumentReadyState().values().stream().allMatch(Boolean::booleanValue);
    }
}
