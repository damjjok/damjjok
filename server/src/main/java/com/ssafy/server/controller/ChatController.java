package com.ssafy.server.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ChatController {

    @GetMapping("/chat/{roomNumber}")
    public String chatPage(@PathVariable String roomNumber, Model model) {
        model.addAttribute("roomNumber", roomNumber);
        return "chat.html"; // 채팅 페이지로 이동
    }

}
