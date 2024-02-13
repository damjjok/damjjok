package com.ssafy.server.service.implement;

import com.ssafy.server.common.ResponseCode;
import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.request.openvidu.OpenViduConnectionRequestDto;
import com.ssafy.server.dto.request.openvidu.OpenViduDisconnectionRequestDto;
import com.ssafy.server.dto.request.openvidu.OpenViduSessionInitializeRequestDto;
import com.ssafy.server.dto.response.openvidu.OpenViduConnectionResponseDto;
import com.ssafy.server.dto.response.openvidu.OpenViduDisconnectionResponseDto;
import com.ssafy.server.dto.response.openvidu.OpenViduSessionInitializeResponseDto;
import com.ssafy.server.exception.CustomException;
import com.ssafy.server.service.OpenViduService;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OpenViduServiceImpl implements OpenViduService {
    private final RedisTemplate<String, String> redisTemplate;
    @Override
    public ResponseEntity<? super OpenViduSessionInitializeResponseDto> initializeSession(OpenViduSessionInitializeRequestDto dto, OpenVidu openVidu) {
        String newSessionId = null;

        try{
            ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

            String sessionKey = dto.getSessionKey();
            String sessionId = valueOperations.get(sessionKey) ;

            if(sessionId != null && openVidu.getActiveSession(sessionId) != null){
                return ResponseEntity.ok(sessionId);
            }
            Map<String, Object> params = new HashMap<>();
            params.put("sessionKey", sessionKey);
            SessionProperties properties = SessionProperties.fromJson(params).build();
            Session session = openVidu.createSession(properties);
            newSessionId = session.getSessionId();
            valueOperations.set(sessionKey, newSessionId);


        }catch(OpenViduJavaClientException | OpenViduHttpException e){
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, ResponseCode.INTERNAL_SERVER_ERROR, "OpenVidu 관련 에러입니다.");
        }
        return ResponseEntity.ok(newSessionId);
    }

    @Override
    public ResponseEntity<? super OpenViduConnectionResponseDto> createConnection(OpenViduConnectionRequestDto dto, OpenVidu openVidu) {
        String token;
        try{
            String sessionId = dto.getSessionId();
            Session session = openVidu.getActiveSession(sessionId);
            if (session == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            Map<String, Object> params = new HashMap<>();
            ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
            Connection connection = session.createConnection(properties);
            token = connection.getToken();
        }catch(OpenViduJavaClientException | OpenViduHttpException e){
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, ResponseCode.INTERNAL_SERVER_ERROR, "OpenVidu 관련 에러입니다.");
        }

        return OpenViduConnectionResponseDto.success(token);
    }

    @Override
    public ResponseEntity<? super OpenViduDisconnectionResponseDto> closeSession(OpenViduDisconnectionRequestDto dto, OpenVidu openVidu) {
        try{
            ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
            String sessionKey = dto.getSessionKey();
            String sessionId = valueOperations.get(sessionKey);
            Session session = openVidu.getActiveSession(sessionId);

            if (session == null || !session.getActiveConnections().isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            redisTemplate.delete(sessionKey);
            session.close();

        }catch(OpenViduJavaClientException | OpenViduHttpException e){
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, ResponseCode.INTERNAL_SERVER_ERROR, "OpenVidu 관련 에러입니다.");
        }

        return OpenViduDisconnectionResponseDto.success();
    }
}
