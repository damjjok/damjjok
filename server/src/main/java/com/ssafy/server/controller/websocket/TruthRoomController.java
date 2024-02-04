package com.ssafy.server.controller.websocket;

import com.ssafy.server.dto.websocket.TruthRoomDto;
import com.ssafy.server.service.EnterRoomService;
import com.ssafy.server.service.NextStageService;
import com.ssafy.server.service.VoteService;
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
    private final EnterRoomService enterRoomService;
    private final SimpMessageSendingOperations messagingTemplate;
    private final NextStageService nextStageService;
    private final VoteService voteService;

    // 방에 입장
    @MessageMapping("/enter/{roomId}/{userName}")
    public void enter(@DestinationVariable Integer roomId, @DestinationVariable String userName, SimpMessageHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();
        enterRoomService.addMember(roomId, sessionId, userName);
        //입장 목록 보내주기
        messagingTemplate.convertAndSend("/topic/member/" + roomId, enterRoomService.getRoomMembers(roomId));
    }

    // 준비 상태 설정 (공통 준비 상태)
    @MessageMapping("/ready/{roomId}")
    public void ready(@DestinationVariable Integer roomId, Boolean isReady, SimpMessageHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();
        enterRoomService.setMemberReady(roomId, sessionId, isReady);
        if (enterRoomService.areAllMemberReady(roomId)) {
            //준비했을때 모든 인원이 준비라면 모두에게 true 보내주기
            messagingTemplate.convertAndSend("/topic/readyState/" + roomId, true);
        }
    }

    // 증거 목록 단계 준비 상태 설정
    @MessageMapping("/evidenceNextStage/{roomId}")
    public void evidenceNextStage(@DestinationVariable Integer roomId, Boolean isNext, SimpMessageHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();
        nextStageService.setEvidenceNext(roomId, sessionId, isNext);
        messagingTemplate.convertAndSend("/topic/evidenceNextStageState/" + roomId, nextStageService.countEvidenceNext(roomId));
        //모두 다음단계로를 눌렀다면 투표화면 열어주기
        if (nextStageService.checkAllEvidenceNextReady(roomId)) {
            messagingTemplate.convertAndSend("/topic/voteStart/" + roomId, true);
        }
    }

    @MessageMapping("/passFailVote/{roomId}")
    public void passFailVote(@DestinationVariable Integer roomId, Boolean isPass, SimpMessageHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();
        voteService.vote(roomId, sessionId, isPass);
        int voteCount = voteService.countVotes(roomId);
        //현재 투표한 수 알려주기
        messagingTemplate.convertAndSend("/topic/passFailVoteState/" + roomId, voteCount);
        //투표 수가 담쪽이를 제외한 접속자 수가 되면 결과 보내주기
        if(voteService.checkVotingComplete(roomId)) {
            boolean result = voteService.calculateResult(roomId);
            messagingTemplate.convertAndSend("/topic/voteResult/" + roomId, result ? "PASS" : "FAIL");
        }
    }

    //pass일 경우 방 나가기 버튼을 누르면
    @MessageMapping("/afterPass/{roomId}")
    public void afterPass(@DestinationVariable Integer roomId, SimpMessageHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();
        enterRoomService.removeMember(roomId, sessionId);
        //방이 삭제 되지 않았는데 방의 멤버가 나 다갔다면 방 없애주기
        if(enterRoomService.isRoomEmpty(roomId)) {
            enterRoomService.deleteRoom(roomId);
        }
    }

    @MessageMapping("/finalArgumentReady/{roomId}")
    public void finalArgumentReady(@DestinationVariable Integer roomId, Boolean isReady, SimpMessageHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();
        nextStageService.setFinalArgumentReady(roomId, sessionId, isReady);
        int readyCount = nextStageService.countFinalArgumentReady(roomId);
        messagingTemplate.convertAndSend("/topic/finalArgumentReadyState/" + roomId, readyCount);
        //모두가 준비를 누르면 최후변론 단계 시작됐다고 알려주기
        if(nextStageService.checkAllFinalArgumentReady(roomId)) {
            messagingTemplate.convertAndSend("/topic/startFinalArgument/" + roomId, "START");
        }
    }

}
