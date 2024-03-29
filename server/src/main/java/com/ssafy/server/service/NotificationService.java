package com.ssafy.server.service;

import com.ssafy.server.dto.request.notification.NotificationCheckReadRequestDto;
import com.ssafy.server.dto.request.notification.NotificationCreateRequestDto;
import com.ssafy.server.dto.response.notification.NotificationCheckReadResponseDto;
import com.ssafy.server.dto.response.notification.NotificationCreateResponseDto;
import com.ssafy.server.dto.response.notification.NotificationListResponseDto;
import org.springframework.http.ResponseEntity;

public interface NotificationService {
    ResponseEntity<? super NotificationListResponseDto> list();
    ResponseEntity<? super NotificationCreateResponseDto> create(NotificationCreateRequestDto dto);
    ResponseEntity<? super NotificationCheckReadResponseDto> checkRead(NotificationCheckReadRequestDto dto);
}
