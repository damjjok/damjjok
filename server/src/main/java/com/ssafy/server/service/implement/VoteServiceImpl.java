package com.ssafy.server.service.implement;

import com.ssafy.server.dto.websocket.TruthRoomDto;
import com.ssafy.server.service.EnterRoomService;
import com.ssafy.server.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
