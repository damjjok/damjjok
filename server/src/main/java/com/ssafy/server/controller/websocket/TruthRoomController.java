package com.ssafy.server.controller.websocket;

import com.ssafy.server.dto.websocket.TruthRoomDto;
import com.ssafy.server.dto.websocket.websocketDto;
import com.ssafy.server.service.EnterRoomService;
import com.ssafy.server.service.NextStageService;
import com.ssafy.server.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

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
        // 방에 남아 있는 멤버들의 이름 목록 가져오기
        Map<String, String> remainingMembers = enterRoomService.getRoomMembers(roomId);
        //입장 목록 보내주기
        messagingTemplate.convertAndSend("/topic/member/" + roomId, remainingMembers.values());
    }

    // 준비 상태 설정 (공통 준비 상태)
    @MessageMapping("/ready/{roomId}")
    public void ready(@DestinationVariable Integer roomId, websocketDto dto, SimpMessageHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();
        boolean isReady = dto.isReady();
        enterRoomService.setMemberReady(roomId, sessionId, isReady);
        messagingTemplate.convertAndSend("/topic/readyState/" + roomId, enterRoomService.countMemberReady(roomId));
        if (enterRoomService.areAllMemberReady(roomId)) {
            //준비했을때 모든 인원이 준비라면 모두에게 true 보내주기
            messagingTemplate.convertAndSend("/topic/readyResult/" + roomId, true);
        }
    }

    // 증거 목록 단계 준비 상태 설정
    @MessageMapping("/evidenceNextStage/{roomId}")
    public void evidenceNextStage(@DestinationVariable Integer roomId, websocketDto dto, SimpMessageHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();
        boolean isNext = dto.isNext();
        nextStageService.setEvidenceNext(roomId, sessionId, isNext);
        messagingTemplate.convertAndSend("/topic/evidenceNextStageState/" + roomId, nextStageService.countEvidenceNext(roomId));
        //모두 다음단계로를 눌렀다면 투표화면 열어주기
        if (nextStageService.checkAllEvidenceNextReady(roomId)) {
            messagingTemplate.convertAndSend("/topic/voteStart/" + roomId, true);
        }
    }

    @MessageMapping("/passFailVote/{roomId}")
    public void passFailVote(@DestinationVariable Integer roomId, websocketDto dto, SimpMessageHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();
        boolean isPass = dto.isPass();
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
        if (roomId != null) {
            enterRoomService.removeMember(roomId, sessionId); // 사용자를 방에서 제거
            // 세션 ID에 대한 매핑을 sessionRoomMap에서 제거
            enterRoomService.removeSessionFromRoomMap(sessionId);

            // 방에 남아 있는 멤버들의 이름 목록 가져오기
            Map<String, String> remainingMembers = enterRoomService.getRoomMembers(roomId);
            // 남은 멤버들의 이름 목록을 웹소켓을 통해 전송
            messagingTemplate.convertAndSend("/topic/remainingMembers/" + roomId, remainingMembers.values());
            if(enterRoomService.isRoomEmpty(roomId)) {
                enterRoomService.deleteRoom(roomId); // 모든 사용자가 나갔다면 방 삭제
            }
        }
    }

    @MessageMapping("/finalArgumentReady/{roomId}")
    public void finalArgumentReady(@DestinationVariable Integer roomId, websocketDto dto, SimpMessageHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();
        boolean isReady = dto.isReady();
        nextStageService.setFinalArgumentReady(roomId, sessionId, isReady);
        int readyCount = nextStageService.countFinalArgumentReady(roomId);
        messagingTemplate.convertAndSend("/topic/finalArgumentReadyState/" + roomId, readyCount);
        //모두가 준비를 누르면 최후변론 단계 시작됐다고 알려주기
        if(nextStageService.checkAllFinalArgumentReady(roomId)) {
            messagingTemplate.convertAndSend("/topic/startFinalArgument/" + roomId, "START");
        }
    }

    //최후 변론이 끝났다고 알려주면 money 투표가 시작됐다고 알려주기
    @MessageMapping("/finishFinalArgument/{roomId}")
    public void startMoneyVote(@DestinationVariable Integer roomId, SimpMessageHeaderAccessor headerAccessor){
        messagingTemplate.convertAndSend("/topic/startSubmit/" + roomId, "START");
    }

    @MessageMapping("/submitFine/{roomId}")
    public void submitFine(@DestinationVariable Integer roomId, websocketDto dto, SimpMessageHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();
        Integer fineAmount = dto.getFineAmount();
        Integer cnt = voteService.submitFine(roomId, sessionId, fineAmount);
        // 벌금 입력 완료된 멤버 수 알려주기
        messagingTemplate.convertAndSend("/topic/fineSubmittedCount/" + roomId, cnt);
        // 모든 멤버가 벌금 입력을 완료했다면 투표 시작하기
        if(cnt == enterRoomService.getRoomMembers(roomId).size() - 1) {
            messagingTemplate.convertAndSend("/topic/startMoenyVote/" + roomId, "START");
        }
    }

    @MessageMapping("/voteFine/{roomId}")
    public void voteFine(@DestinationVariable Integer roomId, websocketDto dto, SimpMessageHeaderAccessor headerAccessor) {
        Integer fineAmount = dto.getFineAmount(); // 투표할 벌금 값
        Integer cnt = voteService.voteForMoney(roomId, fineAmount);
        //투표 인원 투표 할 때마다 보내주기
        messagingTemplate.convertAndSend("/topic/fineVoteCount/" + roomId, cnt);
        if(cnt == enterRoomService.getRoomMembers(roomId).size()-1) {
            Integer money = voteService.getMostVotedFine(roomId); // 가장 많이 투표된 돈
            messagingTemplate.convertAndSend("/topic/fineVoteResulte/" + roomId, money);
        }
    }

    // 웹소켓 세션이 종료될 때 호출될 메소드
    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        String sessionId = event.getSessionId();
        // sessionId를 이용해 방 ID와 사용자 이름을 찾아낸다.
        Integer roomId = enterRoomService.getRoomIdFromSession(sessionId);
        if (roomId != null) {
            enterRoomService.removeMember(roomId, sessionId); // 사용자를 방에서 제거
            // 세션 ID에 대한 매핑을 sessionRoomMap에서 제거
            enterRoomService.removeSessionFromRoomMap(sessionId);

            // 방에 남아 있는 멤버들의 이름 목록 가져오기
            Map<String, String> remainingMembers = enterRoomService.getRoomMembers(roomId);
            // 남은 멤버들의 이름 목록을 웹소켓을 통해 전송
            messagingTemplate.convertAndSend("/topic/remainingMembers/" + roomId, remainingMembers.values());
            if(enterRoomService.isRoomEmpty(roomId)) {
                enterRoomService.deleteRoom(roomId); // 모든 사용자가 나갔다면 방 삭제
            }
        }
    }

    //마지막 나가기 버튼을 눌렀을 때
    @MessageMapping("/leaveRoom/{roomId}")
    public void leaveRoom(@DestinationVariable Integer roomId, SimpMessageHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();
        // 사용자를 방에서 제거
        enterRoomService.removeMember(roomId, sessionId);
        enterRoomService.removeSessionFromRoomMap(sessionId); // 세션 매핑 제거

        // 방에 남아 있는 멤버들의 이름 목록 가져오기
        Map<String, String> remainingMembers = enterRoomService.getRoomMembers(roomId);
        // 남은 멤버들의 이름 목록을 웹소켓을 통해 전송
        messagingTemplate.convertAndSend("/topic/remainingMembers/" + roomId, remainingMembers.values());

        if(enterRoomService.isRoomEmpty(roomId)) {
            enterRoomService.deleteRoom(roomId); // 모든 사용자가 나갔다면 방 삭제
        }
    }




}
