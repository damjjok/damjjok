package com.ssafy.server.service;

public interface VoteService {
    Integer vote (Integer roomId, String sessionId, boolean isPass);
}
