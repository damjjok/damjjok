package com.ssafy.server.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

public interface VoteService {
    Integer vote (Integer roomId, String sessionId, boolean isPass);
    Integer countVotes(Integer roomId);
    boolean calculateResult(Integer roomId);
    boolean checkVotingComplete(Integer roomId);
    //벌금 입력 처리
    Integer submitFine(Integer roomId, String sessionId, Integer fineAmount);
    //벌금 투표 받기, 투표 한 인원 수 반환
    Integer voteForMoney(Integer roomId, Integer fineAmount);

    //투표된 벌금 리스트 주기
    List<Integer> getMoneyList(Integer roomId);

    //벌금 투표에서 가장 많이 투표된 벌금 찾기
    Integer getMostVotedFine(Integer roomId);
}


