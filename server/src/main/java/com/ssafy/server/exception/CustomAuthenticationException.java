package com.ssafy.server.exception;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;


public class CustomAuthenticationException extends AuthenticationException {

    public CustomAuthenticationException(String msg) {
        super(msg);

    }

}
