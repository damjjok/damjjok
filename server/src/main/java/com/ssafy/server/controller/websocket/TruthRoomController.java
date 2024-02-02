package com.ssafy.server.controller.websocket;

import com.ssafy.server.dto.websocket.TruthRoomDto;
import com.ssafy.server.service.EnterRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
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

    @MessageMapping("/enter/{userName}")
    public void enter(@DestinationVariable String userName, TruthRoomDto dto, SimpMessageHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();
        Integer roomId = dto.getRoomId();
        enterRoomService.createOrGetRoom(roomId);
        enterRoomService.addMember(roomId, sessionId, userName);
        //입장 목록 보내주기
        messagingTemplate.convertAndSend("/topic/member",enterRoomService.createOrGetRoom(roomId));
    }

    @MessageMapping("/ready")
    public void ready(TruthRoomDto dto, SimpMessageHeaderAccessor headerAccessor){
        String sessionId = headerAccessor.getSessionId();
        Integer roomId = dto.getRoomId();
        enterRoomService.setMemberReady(roomId, sessionId, true);
        if(enterRoomService.areAllMemberReadey(roomId)) {
            //준비했을때 모든 인원이 준비라면 모두에게 true 보내주기
            messagingTemplate.convertAndSend("/app/readyState", true);
        }
    }
}
