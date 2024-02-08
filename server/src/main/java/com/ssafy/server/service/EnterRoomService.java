package com.ssafy.server.service;

import com.ssafy.server.dto.websocket.MemberInfoDto;
import com.ssafy.server.dto.websocket.TruthRoomDto;

import java.util.Map;

public interface EnterRoomService {
    TruthRoomDto createOrGetRoom(Integer roomId);
    TruthRoomDto getRoom(Integer roomId);
    void addMember(Integer roomId, String sessionId, String userName, String role);
    Map<String, MemberInfoDto> getRoomMembers(Integer roomId);
    Integer countMemberReady(Integer roomId);
    void removeMember(Integer roomId, String sessionId);
    void deleteRoom(Integer roomId);
    void setMemberReady(Integer roomId, String sessionId, boolean isReady);
    boolean areAllMemberReady(Integer roomId);
    boolean isRoomEmpty(Integer roomId);
    // 세션 ID와 방 ID를 매핑하는 메소드
    void mapSessionToRoom(String sessionId, Integer roomId);
    // 세션 ID로 방 ID를 조회하는 메소드
    Integer getRoomIdFromSession(String sessionId);
    // 세션 ID에 해당하는 매핑을 제거하는 메소드
    void removeSessionFromRoomMap(String sessionId);
    //투표 결과 챌린지 반영
    void setChallengeState(Integer challengeId, String status);
}
