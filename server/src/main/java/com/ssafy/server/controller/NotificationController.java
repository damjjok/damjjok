package com.ssafy.server.controller;

import com.ssafy.server.dto.request.notification.NotificationCheckReadRequestDto;
import com.ssafy.server.dto.request.notification.NotificationCreateRequestDto;
import com.ssafy.server.dto.response.notification.NotificationCheckReadResponseDto;
import com.ssafy.server.dto.response.notification.NotificationCreateResponseDto;
import com.ssafy.server.dto.response.notification.NotificationListResponseDto;
import com.ssafy.server.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "알림", description = "알림함에 알림 보내기")
@RestController
@RequestMapping("/api/v1/notification")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    @Operation(summary = "알림 리스트", description = "유저의 알림 리스트를 불러옵니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "SU", description = "성공", content = @Content(schema = @Schema(implementation = NotificationListResponseDto.class)))
    })
    @GetMapping("")
    public ResponseEntity<? super NotificationListResponseDto> list () {
        ResponseEntity<? super NotificationListResponseDto> response = notificationService.list();
        return response;
    }

    @Operation(summary = "알림 보내기", description = "알림을 생성해서 알림함에 보냅니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "SU", description = "성공", content = @Content(schema = @Schema(implementation = NotificationCreateResponseDto.class)))
    })
    @PostMapping("/")
    public ResponseEntity<? super NotificationCreateResponseDto> create (@RequestBody NotificationCreateRequestDto dto) {
        ResponseEntity<? super NotificationCreateResponseDto> response = notificationService.create(dto);
        return response;
    }

    @Operation(summary = "알림 읽음 체크", description = "알림 읽음 표시")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "SU", description = "성공", content = @Content(schema = @Schema(implementation = NotificationCheckReadResponseDto.class)))
    })
    @PatchMapping("/")
    public ResponseEntity<? super NotificationCheckReadResponseDto> checkRead(@RequestBody NotificationCheckReadRequestDto dto) {
        ResponseEntity<? super NotificationCheckReadResponseDto> response = notificationService.checkRead(dto);
        return response;
    }
}
