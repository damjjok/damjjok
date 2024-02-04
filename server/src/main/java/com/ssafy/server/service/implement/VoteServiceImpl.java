package com.ssafy.server.service.implement;

import com.ssafy.server.dto.websocket.TruthRoomDto;
import com.ssafy.server.service.EnterRoomService;
import com.ssafy.server.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class VoteServiceImpl implements VoteService {
    private final EnterRoomService enterRoomService;
    @Override
    public Integer vote(Integer roomId, String sessionId, boolean isPass) {
        TruthRoomDto room = enterRoomService.getRoom(roomId);
        if(room != null) {
            room.getPassOrFail().put(sessionId, isPass);
        }
        long count = room.getPassOrFail().size();
        return (int) count;
    }

    @Override
    public Boolean calculateResult(Integer roomId) {
        TruthRoomDto room = enterRoomService.getRoom(roomId);
        if (room == null || room.getPassOrFail().isEmpty()) {
            // 방이 존재하지 않거나 아무도 투표하지 않았으면 FAIL 처리
            return false;
        }

        // PASS 표 수 계산
        long passCount = room.getPassOrFail().values().stream()
                .filter(Boolean::booleanValue)
                .count();

        // FAIL 표 수 계산 (투표한 전체 인원에서 PASS 표 수를 빼면 FAIL 표 수를 알 수 있음)
        long totalCount = room.getPassOrFail().size();
        long failCount = totalCount - passCount;

        // PASS 표가 FAIL 표보다 많으면 true (PASS), 그렇지 않으면 false (FAIL) 반환
        return passCount > failCount;
    }

//    @Override
//    public Map<String, Boolean> voteResult(Integer roomId) {
//        TruthRoomDto room = enterRoomService.getRoom(roomId);
//        if(room != null) {
//            return room.getPassOrFail();
//        } else {
//            return new HashMap<>();
//        }
//    }

}
