package com.ssafy.server.exception;

public class DuplicateChallengeException extends RuntimeException {

    public DuplicateChallengeException(String message) {
        super(message);
    }

    public DuplicateChallengeException() {
        super("There's a challenge that's going on");
    }
}
