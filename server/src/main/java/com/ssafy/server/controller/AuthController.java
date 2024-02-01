package com.ssafy.server.controller;

import com.ssafy.server.dto.request.auth.SignUpRequestDto;
import com.ssafy.server.dto.request.auth.TokenRequestDto;
import com.ssafy.server.dto.response.auth.SignUpResponseDto;
import com.ssafy.server.dto.response.auth.TokenResponseDto;
import com.ssafy.server.dto.response.candy.CandyCreateResponseDto;
import com.ssafy.server.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Auth Controller", description = "OAuth, 로그인 관련 API")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/sign-up")
    @Operation(summary = "회원가입", description = "SNS의 사용자 정보와 결합해 회원가입합니다",
            responses = { @ApiResponse(responseCode = "200", description = "회원가입 성공",
                    content = @Content(schema = @Schema(implementation = SignUpResponseDto.class)))})
    public ResponseEntity<? super SignUpResponseDto> signUp(
            @RequestBody @Valid SignUpRequestDto requestBody
    ){
        ResponseEntity<? super SignUpResponseDto> response = authService.signUp(requestBody);
        return response;
    }

    @PostMapping("/refresh-token")
    @Operation(summary = "토큰 새롭게 발급", description = "refresh-token 가지고 새로운 토큰들 요청",
            responses = { @ApiResponse(responseCode = "200", description = "토큰 발급 성공",
                    content = @Content(schema = @Schema(implementation = TokenResponseDto.class)))})
    public ResponseEntity<? super TokenResponseDto> createNewToken(
            @RequestBody TokenRequestDto requestBody
    ){
        ResponseEntity<? super TokenResponseDto> response = authService.createNewToken(requestBody);
        return response;
    }
}
