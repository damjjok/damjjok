package com.ssafy.server.exception;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;


public class CustomAuthenticationException extends AuthenticationException {

    private HttpStatus status; // HTTP 상태 코드를 저장할 필드

    // 생성자
    public CustomAuthenticationException(String msg, HttpStatus status) {
        super(msg);
        this.status = status;
    }

    // HTTP 상태 코드를 반환하는 메소드
    public HttpStatus getStatus() {
        return status;
    }
}
