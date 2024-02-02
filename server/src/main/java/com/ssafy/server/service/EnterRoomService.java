package com.ssafy.server.service;

import com.ssafy.server.dto.websocket.TruthRoomDto;

public interface EnterRoomService {
    TruthRoomDto createOrGetRoom(Integer roomId);
    void addMember(Integer roomId, String sessionId, String userName);
    void removeMember(Integer roomId, String sessionId);
    void setMemberReady(Integer roomId, String sessionId, boolean isReady);
    boolean areAllMemberReadey(Integer roomId);
}
