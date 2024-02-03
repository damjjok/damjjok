package com.ssafy.server.dto.websocket;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TruthRoomDto {
    Integer roomId;
    Map<String, String> members = new HashMap<>(); //진실의 방 입장멤버 저장
    Integer money; //현재 벌금 정보
    Map<String, Boolean> readyState = new HashMap<>(); //첫 시작 준비 상태 저장
    Map<String, Boolean> evidenceNextStage = new HashMap<>(); //증거 판별 다음 단계 상태 저장
    Map<String, Boolean> passOrFail = new HashMap<>(); //유죄 무죄 판결 , 담쪽이는 투표 하지 않음
}
