package com.ssafy.server.dto.websocket;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TruthRoomDto {
    Integer roomId;
    Map<String, String> members = new HashMap<>(); //진실의 방 입장멤버 저장
    Map<String, Boolean> readyState = new HashMap<>(); //첫 시작 준비 상태 저장
    Map<String, Boolean> evidenceNextStage = new HashMap<>(); //증거 판별 다음 단계 상태 저장
    Map<String, Boolean> passOrFail = new HashMap<>(); //유죄 무죄 판결 , 담쪽이는 투표 하지 않음
    Map<String, Boolean> finalArgumentReadyState = new HashMap<>(); // 최후 변론 준비 상태 저장
    Set<Integer> finesSubmitted = new HashSet<>(); //벌금 입력 값 저장 -> 중복 방지
    Integer submitCnt; //벌금 값 입력한 수
    Map<Integer, Integer> fineVotes = new HashMap<>(); // 각 벌금 값에 대한 투표 수
    Integer resultMoney;
}
