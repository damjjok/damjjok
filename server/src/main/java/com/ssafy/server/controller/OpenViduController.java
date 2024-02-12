package com.ssafy.server.controller;


import com.ssafy.server.dto.request.openvidu.OpenViduConnectionRequestDto;
import com.ssafy.server.dto.request.openvidu.OpenViduDisconnectionRequestDto;
import com.ssafy.server.dto.request.openvidu.OpenViduSessionInitializeRequestDto;
import com.ssafy.server.dto.response.openvidu.OpenViduConnectionResponseDto;
import com.ssafy.server.dto.response.openvidu.OpenViduDisconnectionResponseDto;
import com.ssafy.server.dto.response.openvidu.OpenViduSessionInitializeResponseDto;
import com.ssafy.server.service.OpenViduService;
import io.openvidu.java.client.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class OpenViduController {
    private final RedisTemplate<String, String> redisTemplate;
    private final OpenViduService openViduService;



    @Value("${openvidu.url}")
    private String OPENVIDU_URL;

    @Value("${openvidu.secret}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }



    @PostMapping("/sessions")
    @Operation(summary = "진실의방 세션 생성", description = "진실의방 세션을 생성합니다.",
            responses = { @ApiResponse(responseCode = "200", description = "진실의방 세션 생성 성공",
                    content = @Content(schema = @Schema(implementation = OpenViduSessionInitializeResponseDto.class)))})
    public ResponseEntity<? super OpenViduSessionInitializeResponseDto> initializeSession(@RequestBody @Valid OpenViduSessionInitializeRequestDto requestBody)
            {
        return openViduService.initializeSession(requestBody, openvidu);
    }

    @PostMapping("/sessions/{sessionId}/connections")
    @Operation(summary = "진실의방 토큰 발급", description = "진실의방 토큰을 발급합니다.",
            responses = { @ApiResponse(responseCode = "200", description = "진실의방 토큰 발급 성공",
                    content = @Content(schema = @Schema(implementation = OpenViduConnectionResponseDto.class)))})
    public ResponseEntity<? super OpenViduConnectionResponseDto> createConnection(@PathVariable("sessionId") String sessionId)
             {
        OpenViduConnectionRequestDto requestBody = new OpenViduConnectionRequestDto();
        requestBody.setSessionId(sessionId);

        return openViduService.createConnection(requestBody, openvidu);
    }

    @DeleteMapping("/sessions/{sessionKey}")
    @Operation(summary = "진실의방 세션 닫기", description = "진실의방 세션을 닫습니다.",
            responses = { @ApiResponse(responseCode = "200", description = "진실의방 세션 닫기 성공",
                    content = @Content(schema = @Schema(implementation = OpenViduDisconnectionResponseDto.class)))})
    public ResponseEntity<? super OpenViduDisconnectionResponseDto> closeSession(@PathVariable String sessionKey)
             {

        OpenViduDisconnectionRequestDto requestBody = new OpenViduDisconnectionRequestDto();
        requestBody.setSessionKey(sessionKey);

        return openViduService.closeSession(requestBody, openvidu);
    }

}
