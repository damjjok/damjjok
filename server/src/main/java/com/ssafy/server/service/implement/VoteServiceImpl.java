package com.ssafy.server.service.implement;

import com.ssafy.server.common.ResponseCode;
import com.ssafy.server.dto.websocket.TruthRoomDto;
import com.ssafy.server.exception.CustomException;
import com.ssafy.server.exception.RoomNotFoundException;
import com.ssafy.server.service.EnterRoomService;
import com.ssafy.server.service.VoteService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class VoteServiceImpl implements VoteService {
    private final EnterRoomService enterRoomService;
    @Override
    @Transactional
    public Integer vote(Integer roomId, String sessionId, boolean isPass) {
        TruthRoomDto room = enterRoomService.getRoom(roomId);
        if (room == null) {
            throw new RoomNotFoundException();
        }
        room.getPassOrFail().put(sessionId, isPass);
        long count = room.getPassOrFail().size();
        return (int) count;
    }

    @Override
    @Transactional
    public Integer countVotes(Integer roomId) {
        TruthRoomDto room = enterRoomService.getRoom(roomId);
        if (room == null) {
            throw new RoomNotFoundException();
        }
        if (room.getPassOrFail() == null) {
            throw new CustomException(HttpStatus.BAD_REQUEST, ResponseCode.BAD_REQUEST, "해당 방에는 투표 데이터가 없습니다.");
        }
        return room.getPassOrFail().size(); // 진행된 투표의 총 수 반환
    }

    @Override
    @Transactional
    public boolean checkVotingComplete(Integer roomId) {
        TruthRoomDto room = enterRoomService.getRoom(roomId);
        if (room == null) {
            throw new RoomNotFoundException();
        }
        if (room.getMembers() == null){
            throw new CustomException(HttpStatus.BAD_REQUEST, ResponseCode.BAD_REQUEST, "해당 방에는 멤버 데이터가 없습니다.");
        }
        if(room.getPassOrFail() == null) {
            throw new CustomException(HttpStatus.BAD_REQUEST, ResponseCode.BAD_REQUEST, "해당 방에는 pass fail 투표 결과 데이터가 없습니다.");
        }
        //담쪽이 제외 모두가 투표를 했을 경우 true 반환
        return room.getMembers().size() - 1 == room.getPassOrFail().size();
    }

    @Override
    @Transactional
    public boolean calculateResult(Integer roomId) {
        TruthRoomDto room = enterRoomService.getRoom(roomId);
        if (room == null) {
            throw new RoomNotFoundException();
        }
        if (room.getPassOrFail().isEmpty()) {
            throw new CustomException(HttpStatus.BAD_REQUEST, ResponseCode.BAD_REQUEST, "아무도 투표하지 않았습니다.");
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
    @Transactional
    public Integer submitFine(Integer roomId, String sessionId, Integer fineAmount) {
        TruthRoomDto room = enterRoomService.getRoom(roomId);
        if (room == null) {
            throw new RoomNotFoundException();
        }
        int cnt = 0;
        room.getFineVotes().putIfAbsent(fineAmount, 0);
        //입력한 사람 수 올려주기
        cnt = room.getSubmitCnt()+1;
        room.setSubmitCnt(cnt);
        return cnt;
    }

    //투표된 벌금 리스트 주기
    @Override
    @Transactional
    public List<Integer> getMoneyList(Integer roomId) {
        TruthRoomDto room = enterRoomService.getRoom(roomId);
        if (room == null) {
            throw new RoomNotFoundException();
        }
        List<Integer> moneyList = new ArrayList<>(room.getFineVotes().keySet()); // keySet을 이용해 키 값만 추출하고, List로 변환
        Collections.sort(moneyList); // 추출한 키 리스트를 오름차순으로 정렬
        return moneyList;
    }


    //벌금 투표 받기, 투표 한 인원 수 반환
    @Override
    @Transactional
    public Integer voteForMoney(Integer roomId, Integer fineAmount) {
        TruthRoomDto room = enterRoomService.getRoom(roomId);
        if (room == null) {
            throw new RoomNotFoundException();
        }
        int cnt = 0;
        room.getFineVotes().merge(fineAmount, 1, Integer::sum); // 해당 벌금 값에 대한 투표 수 증가
        //총 투표 수
        cnt = room.getFineVotes().values().stream()
                .mapToInt(Integer::intValue)
                .sum();

        return cnt;
    }


    //벌금 투표에서 가장 많이 투표된 벌금 찾기
    @Override
    @Transactional
    public Integer getMostVotedFine(Integer roomId) {
        TruthRoomDto room = enterRoomService.getRoom(roomId);
        if (room == null) {
            throw new RoomNotFoundException();
        }
        // 최대 투표 수 찾기
        int maxVotes = room.getFineVotes().values().stream()
                .max(Integer::compare)
                .orElse(0);

        // 최대 투표 수를 받은 항목들 중 키 값이 가장 작은 항목 찾기
        Integer resultMoney = room.getFineVotes().entrySet().stream()
                .filter(entry -> entry.getValue().equals(maxVotes))
                .min(Map.Entry.comparingByKey())
                .map(Map.Entry::getKey)
                .orElse(null);

        // 결과 값 dto에 저장하기
        room.setResultMoney(resultMoney);
        return resultMoney;
    }


}
