package com.ssafy.server.service;

import com.ssafy.server.dto.request.notification.NotificationListRequestDto;
import com.ssafy.server.dto.response.notification.NotificationListResponseDto;
import org.springframework.http.ResponseEntity;

public interface NotificationService {
    ResponseEntity<? super NotificationListResponseDto> list(NotificationListRequestDto dto);
}
