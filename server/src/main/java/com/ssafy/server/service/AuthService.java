package com.ssafy.server.service;

import com.ssafy.server.dto.request.auth.SignUpRequestDto;
import com.ssafy.server.dto.request.auth.TokenRequestDto;
import com.ssafy.server.dto.response.auth.FcmTokenResponseDto;
import com.ssafy.server.dto.response.auth.SignUpResponseDto;
import com.ssafy.server.dto.response.auth.TokenResponseDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
    ResponseEntity<? super TokenResponseDto> createNewToken(TokenRequestDto dto);
    ResponseEntity<? super FcmTokenResponseDto> changeFcmToken(String fcmToken);

}
