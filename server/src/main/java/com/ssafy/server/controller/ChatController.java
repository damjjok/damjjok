package com.ssafy.server.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ChatController {

    @GetMapping("/chat")
    public String chatPage() {
        return "chat.html"; // 채팅 페이지로 이동
    }
}
