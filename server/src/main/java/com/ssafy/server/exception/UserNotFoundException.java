package com.ssafy.server.exception;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String message) {
        super(message);
    }

    public UserNotFoundException(int userId) {
        super("User with ID " + userId + " not found.");
    }
}
