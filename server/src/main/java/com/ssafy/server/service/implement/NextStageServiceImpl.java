package com.ssafy.server.service.implement;

import com.ssafy.server.dto.websocket.TruthRoomDto;
import com.ssafy.server.service.EnterRoomService;
import com.ssafy.server.service.NextStageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NextStageServiceImpl implements NextStageService {

    private final EnterRoomService enterRoomService;

    @Override
    public void setEvidenceNext(Integer roomId, String sessionId, boolean isNext) {
        TruthRoomDto room = enterRoomService.getRoom(roomId);
        if (room != null){
            room.getEvidenceNextStage().put(sessionId, isNext);
        }
    }

    @Override
    public Integer countEvidenceNext(Integer roomId) {
        TruthRoomDto room = enterRoomService.getRoom(roomId); // 변경된 부분
        if (room == null) {
            return 0; // 방이 존재하지 않으면 0 반환
        }
        long count = room.getEvidenceNextStage().values().stream()
                .filter(Boolean::booleanValue)
                .count();
        return (int) count;
    }

    @Override
    public boolean checkAllEvidenceNextReady(Integer roomId) {
        TruthRoomDto room = enterRoomService.getRoom(roomId);
        if (room == null || room.getEvidenceNextStage() == null) {
            return false; // 방이 존재하지 않거나 준비 데이터가 없는 경우
        }
        // 모든 참가자의 준비 상태가 true인지 확인
        return room.getEvidenceNextStage().values().stream()
                .allMatch(Boolean::booleanValue);
    }

    @Override
    public void setFinalArgumentReady(Integer roomId, String sessionId, Boolean isReady) {
        TruthRoomDto room = enterRoomService.getRoom(roomId); // 변경된 부분
        if (room != null) {
            room.getFinalArgumentReadyState().put(sessionId, isReady);
        }
    }

    @Override
    public Integer countFinalArgumentReady(Integer roomId) {
        TruthRoomDto room = enterRoomService.getRoom(roomId);
        if (room == null || room.getFinalArgumentReadyState() == null) {
            return 0; // 방이 존재하지 않거나 최후 변론 준비 데이터가 없는 경우
        }
        // 준비 상태가 true로 설정된 참가자의 수를 계산
        long count = room.getFinalArgumentReadyState().values().stream()
                .filter(Boolean::booleanValue) // 준비 상태가 true인 경우만 필터링
                .count();
        return (int) count; // 계산된 수를 정수로 반환
    }


    @Override
    public boolean checkAllFinalArgumentReady(Integer roomId) {
        TruthRoomDto room = enterRoomService.getRoom(roomId); // 변경된 부분
        if (room == null) {
            return false;
        }
        return room.getFinalArgumentReadyState().values().stream().allMatch(Boolean::booleanValue);
    }
}
