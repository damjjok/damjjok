package com.ssafy.server.controller;

import com.ssafy.server.dto.request.notification.NotificationListRequestDto;
import com.ssafy.server.dto.response.notification.NotificationListResponseDto;
import com.ssafy.server.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
