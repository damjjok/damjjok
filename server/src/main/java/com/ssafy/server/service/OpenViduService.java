package com.ssafy.server.service;

import com.ssafy.server.dto.request.openvidu.OpenViduConnectionRequestDto;
import com.ssafy.server.dto.request.openvidu.OpenViduDisconnectionRequestDto;
import com.ssafy.server.dto.request.openvidu.OpenViduSessionInitializeRequestDto;
import com.ssafy.server.dto.response.openvidu.OpenViduConnectionResponseDto;
import com.ssafy.server.dto.response.openvidu.OpenViduDisconnectionResponseDto;
import com.ssafy.server.dto.response.openvidu.OpenViduSessionInitializeResponseDto;
import io.openvidu.java.client.OpenVidu;
import org.springframework.http.ResponseEntity;

public interface OpenViduService {

    ResponseEntity<? super OpenViduSessionInitializeResponseDto> initializeSession(OpenViduSessionInitializeRequestDto dto, OpenVidu openVidu);
    ResponseEntity<? super OpenViduConnectionResponseDto> createConnection(OpenViduConnectionRequestDto dto, OpenVidu openVidu);
    ResponseEntity<? super OpenViduDisconnectionResponseDto> closeSession(OpenViduDisconnectionRequestDto dto, OpenVidu openVidu);
}
