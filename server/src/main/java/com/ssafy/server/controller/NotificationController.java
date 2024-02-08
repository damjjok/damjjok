package com.ssafy.server.controller;

import com.ssafy.server.dto.request.notification.NotificationCreateRequestDto;
import com.ssafy.server.dto.request.notification.NotificationListRequestDto;
import com.ssafy.server.dto.response.notification.NotificationCreateResponseDto;
import com.ssafy.server.dto.response.notification.NotificationListResponseDto;
import com.ssafy.server.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ResourceBundle;

@RestController
@RequestMapping("/api/v1/notification")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    @GetMapping("/{userId}")
    public ResponseEntity<? super NotificationListResponseDto> list (@PathVariable int userId) {
        NotificationListRequestDto requestBody = new NotificationListRequestDto();
        requestBody.setUserId(userId);
        ResponseEntity<? super NotificationListResponseDto> response = notificationService.list(requestBody);
        return response;
    }
    @PostMapping("/")
    public ResponseEntity<? super NotificationCreateResponseDto> create (@RequestBody NotificationCreateRequestDto dto) {
        ResponseEntity<? super NotificationCreateResponseDto> response = notificationService.create(dto);
        return response;
    }
}
