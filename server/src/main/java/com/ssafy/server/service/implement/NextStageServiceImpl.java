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
    public Integer cntEvidenceNext(Integer roomId) {
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
    public void setFinalArgumentReady(Integer roomId, String sessionId, Boolean isReady) {
        TruthRoomDto room = enterRoomService.getRoom(roomId); // 변경된 부분
        if (room != null) {
            room.getFinalArgumentReadyState().put(sessionId, isReady);
        }
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
