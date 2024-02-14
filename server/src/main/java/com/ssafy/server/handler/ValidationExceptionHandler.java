package com.ssafy.server.handler;

import com.ssafy.server.common.ResponseCode;
import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.exception.*;
import io.lettuce.core.RedisCommandExecutionException;
import io.lettuce.core.RedisException;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.RedisConnectionFailureException;
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
    @ExceptionHandler(RoomNotFoundException.class) //존재하지 않는 진실의 방
    public ResponseEntity<ResponseDto> handleRoomNotFoundException(RoomNotFoundException ex) {
        ResponseDto responseBody = new ResponseDto(ResponseCode.BAD_REQUEST, "존재하지 않는 진실의 방 Id 입니다.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
    @ExceptionHandler(CustomAuthenticationException.class) // 인증 문제
    public ResponseEntity<ResponseDto> handleCustomAuthenticationException() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.UNAUTHORIZED, "사용자 인증 다시 해주세요.");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }
    // JPA 관련 예외처리
    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<ResponseDto> handleDataAccessException() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.INTERNAL_SERVER_ERROR, "JPA 관련 에러");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ResponseDto> handleConstraintViolationException() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.INTERNAL_SERVER_ERROR, "데이터베이스 제약 조건이 위반되었습니다.");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }

    // Redis 관련 예외처리
    @ExceptionHandler(RedisConnectionFailureException.class)
    public ResponseEntity<Object> handleRedisConnectionFailure(RedisConnectionFailureException ex) {
        ResponseDto response = new ResponseDto(ResponseCode.REDIS_CONNECTION_ERROR, "Redis 서버에 연결할 수 없습니다.");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @ExceptionHandler(RedisCommandExecutionException.class)
    public ResponseEntity<Object> handleRedisCommandExecutionException(RedisCommandExecutionException ex) {
        ResponseDto response = new ResponseDto(ResponseCode.REDIS_COMMAND_FAILURE, "Redis 명령 실행 오류가 발생했습니다.");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @ExceptionHandler(RedisException.class)
    public ResponseEntity<Object> handleRedisException(RedisException ex) {
        ResponseDto response = new ResponseDto(ResponseCode.REDIS_ERROR, "Redis 작업 중 오류가 발생했습니다.");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @ExceptionHandler(MembersNotFoundException.class)
    public ResponseEntity<Object> handleMembersNotFoundException(MembersNotFoundException ex) {
        ResponseDto response = new ResponseDto(ResponseCode.BAD_REQUEST, "해당 방에 멤버값이 없습니다.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    // OpenVidu
    @ExceptionHandler(OpenViduJavaClientException.class)
    public ResponseEntity<Object> handleOpenViduJavaClientException(OpenViduJavaClientException ex) {
        ResponseDto response = new ResponseDto("OPENVIDU_JAVA_CLIENT_ERROR", "OpenVidu 작업 중 오류가 발생했습니다.");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @ExceptionHandler(OpenViduHttpException.class)
    public ResponseEntity<Object> handleOpenViduHttpException(OpenViduHttpException ex) {
        ResponseDto response = new ResponseDto("OPENVIDU_HTTP_ERROR", "OpenVidu 작업 중 오류가 발생했습니다.");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}

