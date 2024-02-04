package com.ssafy.server.service;

import java.util.HashMap;
import java.util.Map;

public interface VoteService {
    Integer vote (Integer roomId, String sessionId, boolean isPass);
    Integer countVotes(Integer roomId);
    boolean calculateResult(Integer roomId);
//    Map<String, Boolean> voteResult (Integer roomId);

    boolean checkVotingComplete(Integer roomId);
}
