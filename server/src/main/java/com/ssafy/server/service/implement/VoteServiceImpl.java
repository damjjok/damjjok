package com.ssafy.server.service.implement;

import com.ssafy.server.dto.websocket.TruthRoomDto;
import com.ssafy.server.service.EnterRoomService;
import com.ssafy.server.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class VoteServiceImpl implements VoteService {
    private final EnterRoomService enterRoomService;
    @Override
    public Integer vote(Integer roomId, String sessionId, boolean isPass) {
        TruthRoomDto room = enterRoomService.getRoom(roomId);
        if(room != null) {
            room.getPassOrFail().put(sessionId, isPass);
        }
        long count = room.getPassOrFail().size();
        return (int) count;
    }

    @Override
    public Integer countVotes(Integer roomId) {
        TruthRoomDto room = enterRoomService.getRoom(roomId);
        if (room == null || room.getPassOrFail() == null) {
            return 0; // 방이 존재하지 않거나 투표 데이터가 없는 경우
        }
        return room.getPassOrFail().size(); // 진행된 투표의 총 수 반환
    }

    @Override
    public boolean checkVotingComplete(Integer roomId) {
        TruthRoomDto room = enterRoomService.getRoom(roomId);
        if (room == null || room.getMembers() == null || room.getPassOrFail() == null) {
            return false; // 방이 존재하지 않거나 필요한 데이터가 없는 경우
        }
        //담쪽이 제외 모두가 투표를 했을 경우 true 반환
        return room.getMembers().size() - 1 == room.getPassOrFail().size();
    }

    @Override
    public boolean calculateResult(Integer roomId) {
        TruthRoomDto room = enterRoomService.getRoom(roomId);
        if (room == null || room.getPassOrFail().isEmpty()) {
            // 방이 존재하지 않거나 아무도 투표하지 않았으면 FAIL 처리
            return false;
        }

        // PASS 표 수 계산
        long passCount = room.getPassOrFail().values().stream()
                .filter(Boolean::booleanValue)
                .count();

        // FAIL 표 수 계산 (투표한 전체 인원에서 PASS 표 수를 빼면 FAIL 표 수를 알 수 있음)
        long totalCount = room.getPassOrFail().size();
        long failCount = totalCount - passCount;

        // PASS 표가 FAIL 표보다 많으면 true (PASS), 그렇지 않으면 false (FAIL) 반환
        return passCount > failCount;
    }

    @Override
    public Integer submitFine(Integer roomId, String sessionId, Integer fineAmount) {
        TruthRoomDto room = enterRoomService.getRoom(roomId);
        int cnt = 0;
        if (room != null) {
            room.getFineVotes().putIfAbsent(fineAmount, 0);
            //입력한 사람 수 올려주기
            cnt = room.getSubmitCnt()+1;
            room.setSubmitCnt(cnt);
        }
        return cnt;
    }

    //투표된 벌금 리스트 주기
    @Override
    public List<Integer> getMoneyList(Integer roomId) {
        TruthRoomDto room = enterRoomService.getRoom(roomId);
        if (room != null) {
            return new ArrayList<>(room.getFineVotes().keySet()); // keySet을 이용해 키 값만 추출하고, List로 변환
        } else {
            return Collections.emptyList(); // 방이 존재하지 않는 경우, 빈 리스트 반환
        }
    }

    //벌금 투표 받기, 투표 한 인원 수 반환
    @Override
    public Integer voteForMoney(Integer roomId, Integer fineAmount) {
        TruthRoomDto room = enterRoomService.getRoom(roomId);
        int cnt = 0;
        if(room != null) {
            room.getFineVotes().merge(fineAmount, 1, Integer::sum); // 해당 벌금 값에 대한 투표 수 증가
            //총 투표 수
            cnt = room.getFineVotes().values().stream()
                    .mapToInt(Integer::intValue)
                    .sum();
        }
        return cnt;
    }


    //벌금 투표에서 가장 많이 투표된 벌금 찾기
    @Override
    public Integer getMostVotedFine(Integer roomId) {
        TruthRoomDto room = enterRoomService.getRoom(roomId);
        Integer resultMoney = room.getFineVotes().entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(null); // 가장 많이 투표된 벌금 값 찾기
        //결과 값 dto에 저장하기
        room.setResultMoney(resultMoney);
        return resultMoney;
    }


}
