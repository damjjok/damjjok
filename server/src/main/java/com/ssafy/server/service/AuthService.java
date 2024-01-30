package com.ssafy.server.service;

import com.ssafy.server.dto.request.auth.SignUpRequestDto;
import com.ssafy.server.dto.response.auth.SignUpResponseDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
}
