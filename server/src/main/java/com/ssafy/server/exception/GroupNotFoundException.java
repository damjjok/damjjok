package com.ssafy.server.exception;

public class GroupNotFoundException extends RuntimeException {

    public GroupNotFoundException(String message) {
        super(message);
    }

    public GroupNotFoundException(int groupId) {
        super("Group with ID " + groupId + " not found.");
    }
}
