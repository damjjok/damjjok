package com.ssafy.server.controller;

import com.ssafy.server.dto.request.auth.SignUpRequestDto;
import com.ssafy.server.dto.request.auth.TokenRequestDto;
import com.ssafy.server.dto.response.auth.SignUpResponseDto;
import com.ssafy.server.dto.response.auth.TokenResponseDto;
import com.ssafy.server.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.temporal.ChronoUnit;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/sign-up")
    public ResponseEntity<? super SignUpResponseDto> signUp(
            @RequestBody @Valid SignUpRequestDto requestBody
    ){
        ResponseEntity<? super SignUpResponseDto> response = authService.signUp(requestBody);
        return response;
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<? super TokenResponseDto> createNewToken(
            @RequestBody TokenRequestDto requestBody
    ){
        ResponseEntity<? super TokenResponseDto> response = authService.createNewToken(requestBody);
        return response;
    }
}
