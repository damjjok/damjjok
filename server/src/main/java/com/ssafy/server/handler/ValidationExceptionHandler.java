package com.ssafy.server.handler;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.exception.CustomException;
import com.ssafy.server.exception.CustomJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ValidationExceptionHandler {
    // 중괄호 쳐서 배열로 전달
    @ExceptionHandler({MethodArgumentNotValidException.class, HttpMessageNotReadableException.class})
    public ResponseEntity<ResponseDto> validationExceptionHandler(Exception exception){
        return ResponseDto.validationFail();
    }

    @ExceptionHandler({CustomJwtException.class})
    public ResponseEntity<ResponseDto> jwtExceptionHandler(Exception exception){
        return ResponseDto.jwtTokenFail();
    }

    // 중복 챌린지 생성 시도
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ResponseDto> handleDuplicateChallengeException(CustomException ex) {
        ResponseDto responseBody = new ResponseDto(ex.getCode(), ex.getMessage());
        return ResponseEntity.status(ex.getStatus()).body(responseBody);
    }
}
