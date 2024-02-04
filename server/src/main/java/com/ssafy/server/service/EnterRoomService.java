package com.ssafy.server.service;

import com.ssafy.server.dto.websocket.TruthRoomDto;

import java.util.Map;

public interface EnterRoomService {
    TruthRoomDto createOrGetRoom(Integer roomId);
    TruthRoomDto getRoom(Integer roomId);
    void addMember(Integer roomId, String sessionId, String userName);
    Map<String, String> getRoomMembers(Integer roomId);
    Integer countMemberReady(Integer roomId);
    void removeMember(Integer roomId, String sessionId);
    void deleteRoom(Integer roomId);
    void setMemberReady(Integer roomId, String sessionId, boolean isReady);
    boolean areAllMemberReady(Integer roomId);
    boolean isRoomEmpty(Integer roomId);
}
