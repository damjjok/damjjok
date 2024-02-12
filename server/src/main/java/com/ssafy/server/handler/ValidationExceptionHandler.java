package com.ssafy.server.handler;

import com.ssafy.server.common.ResponseCode;
import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.exception.*;
import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DataAccessException;
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

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ResponseDto> customException(CustomException ex) {
        ResponseDto responseBody = new ResponseDto(ex.getCode(), ex.getMessage());
        return ResponseEntity.status(ex.getStatus()).body(responseBody);
    }

    @ExceptionHandler(GroupNotFoundException.class) // 존재하지 않는 그룹
    public ResponseEntity<ResponseDto> handleGroupNotFoundException() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.BAD_REQUEST, "존재하지 않는 그룹 ID 입니다.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    @ExceptionHandler(ChallengeNotFoundException.class) // 존재하지 않는 챌린지
    public ResponseEntity<ResponseDto> handleChallengeNotFoundException() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.BAD_REQUEST, "존재하지 않는 챌린지 ID 입니다.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
    @ExceptionHandler(DuplicateChallengeException.class) // 진행중인 챌린지 있음
    public ResponseEntity<ResponseDto> handleDuplicateChallengeException() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.BAD_REQUEST, "진행중인 챌린지가 존재합니다.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
    @ExceptionHandler(CustomAuthenticationException.class) // 인증 문제
    public ResponseEntity<ResponseDto> handleCustomAuthenticationException() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.UNAUTHORIZED, "사용자 인증 다시 해주세요.");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }
    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<ResponseDto> handleDataAccessException() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.BAD_REQUEST, "JPA 관련 에러");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ResponseDto> handleConstraintViolationException() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.BAD_REQUEST, "데이터베이스 제약 조건이 위반되었습니다.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
}
