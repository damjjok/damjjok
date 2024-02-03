package com.ssafy.server.service;

import java.util.HashMap;
import java.util.Map;

public interface VoteService {
    Integer vote (Integer roomId, String sessionId, boolean isPass);
    Map<String, Boolean> voteResult (Integer roomId);
}
