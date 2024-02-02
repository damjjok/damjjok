package com.ssafy.server.controller.websocket;

import com.ssafy.server.dto.websocket.TruthRoomDto;
import com.ssafy.server.service.EnterRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class TruthRoomController {

    private final Map<Integer, TruthRoomDto> truthRooms = new HashMap<>();
    private final EnterRoomService enterRoomService;
    private final SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/enter/{roomId}")
    public void enter(@DestinationVariable Integer roomId,String userName, TruthRoomDto dto, SimpMessageHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();
        enterRoomService.createOrGetRoom(roomId);
        enterRoomService.addMember(roomId, sessionId, userName);
    }
}
