package com.ssafy.server.controller.websocket;

import com.ssafy.server.dto.websocket.TruthRoomDto;
import com.ssafy.server.service.EnterRoomService;
import com.ssafy.server.service.NextStageService;
import com.ssafy.server.service.VoteService;
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
    private final EnterRoomService enterRoomService;
    private final SimpMessageSendingOperations messagingTemplate;
    private final NextStageService nextStageService;
    private final VoteService voteService;

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
    public void ready(TruthRoomDto dto, Boolean isReady,SimpMessageHeaderAccessor headerAccessor){
        String sessionId = headerAccessor.getSessionId();
        Integer roomId = dto.getRoomId();
        enterRoomService.setMemberReady(roomId, sessionId, isReady);
        if(enterRoomService.areAllMemberReadey(roomId)) {
            //준비했을때 모든 인원이 준비라면 모두에게 true 보내주기
            messagingTemplate.convertAndSend("/topic/readyState", true);
        }
    }

    @MessageMapping("/evidenceNextStage")
    public void evidenceNextStage(TruthRoomDto dto, Boolean isNext, SimpMessageHeaderAccessor headerAccessor){
        String sessionId = headerAccessor.getSessionId();
        Integer roomId = dto.getRoomId();
        nextStageService.setEvidenceNext(roomId, sessionId, isNext);
        int cnt = nextStageService.cntEvidenceNext(roomId);
        //다음 단계 누를때마다
        messagingTemplate.convertAndSend("/topic/evidenceNextStageState", cnt);
        if (cnt == dto.getMembers().size()) {
            //모두 다음단계로를 눌렀다면 투표화면 열어주기
            messagingTemplate.convertAndSend("/topic/voteStart", true);
        }
    }

    @MessageMapping("/passFailVote")
    public void passFailVote(TruthRoomDto dto, Boolean isPass, SimpMessageHeaderAccessor headerAccessor){
        String sessionId = headerAccessor.getSessionId();
        Integer roomId = dto.getRoomId();
        int cnt = voteService.vote(roomId, sessionId, isPass);
        //현재 투표한 수 알려주기
        messagingTemplate.convertAndSend("/topic/passFailVoteState", cnt);
        TruthRoomDto room =  enterRoomService.getRoom(roomId);
        //투표 수가 담쪽이를 제외한 접속자 수가 되면 결과 보내주기
        if(cnt == room.getMembers().size()-1) {
            messagingTemplate.convertAndSend("/topic/passFailVoteResult", voteService.voteResult(roomId));
        }
    }


}
