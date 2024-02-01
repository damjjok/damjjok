package com.ssafy.server.controller;

import com.ssafy.server.dto.websocket.Greeting;
import com.ssafy.server.dto.websocket.HelloMessage;
import com.ssafy.server.dto.websocket.VoteMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.util.HtmlUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Controller
public class GreetingController {
    private final Map<String, String> userSessions = new HashMap<>();
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;
    private Map<Integer, Integer> voteResults = new ConcurrentHashMap<>();
    private AtomicInteger voteCount = new AtomicInteger(0);

    // 사용자 연결 시 이름 설정
    @MessageMapping("/register")
    public void register(HelloMessage message, SimpMessageHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();
        userSessions.put(sessionId, message.getName());
        Greeting greeting = new Greeting("Hello," + HtmlUtils.htmlEscape(message.getName()) + "!");
        messagingTemplate.convertAndSend("/topic/greetings", greeting);
    }

    // 사용자가 메시지 보낼 때 처리
    @MessageMapping("/hello")
    public void greeting(HelloMessage message, SimpMessageHeaderAccessor headerAccessor) throws Exception {
        String sessionId = headerAccessor.getSessionId();
        String name = userSessions.getOrDefault(sessionId, "Unknown User");
        Greeting greeting = new Greeting( HtmlUtils.htmlEscape(name) + ": " + HtmlUtils.htmlEscape(message.getContent()));
        messagingTemplate.convertAndSend("/topic/greetings", greeting);
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        String sessionId = event.getSessionId();
        String name = userSessions.remove(sessionId); // 세션 맵에서 사용자 이름 제거
        if (name != null) {
            Greeting greeting = new Greeting(name + " has left the chat");
            messagingTemplate.convertAndSend("/topic/greetings", greeting);
        }
    }

    // 투표 시작 처리
    @MessageMapping("/vote/start")
    public void startVote() {
        // 현재 방에 있는 인원수를 기반으로 투표 시작 메시지 전송
        int currentVotersCount = userSessions.size();
        messagingTemplate.convertAndSend("/topic/voteStart", "투표를 시작합니다. 현재 인원: " + currentVotersCount);
        // 투표 관련 추가 로직 구현...
    }


    @MessageMapping("/vote")
    public void handleVote(VoteMessage message) {
        voteResults.merge(message.getChoice(), 1, Integer::sum); // 투표 선택 집계
        int currentCount = voteCount.incrementAndGet();
        System.out.println("현재 투표 수: " + currentCount + ", 필요한 투표 수: " + userSessions.size());
        if (currentCount >= userSessions.size()) {
            System.out.println("투표 결과 전송: " + voteResults);
            messagingTemplate.convertAndSend("/topic/voteResults", voteResults);
            resetVote();
        }
    }



    public void resetVote() {
        // 투표 상태 초기화
        voteResults.clear();
        voteCount.set(0);
    }

    @Autowired
    public GreetingController(SimpMessageSendingOperations messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        String sessionId = event.getMessage().getHeaders().get("simpSessionId").toString();
        userSessions.put(sessionId, null); // 사용자 이름은 아직 알 수 없으므로 null로 설정
    }


}
