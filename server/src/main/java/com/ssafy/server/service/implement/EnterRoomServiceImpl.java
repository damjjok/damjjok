package com.ssafy.server.service.implement;

import com.ssafy.server.dto.websocket.TruthRoomDto;
import com.ssafy.server.service.EnterRoomService;
import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class EnterRoomServiceImpl implements EnterRoomService {
    private final Map<Integer, TruthRoomDto> truthRooms = new ConcurrentHashMap<>();
    @Override
    public TruthRoomDto createOrGetRoom(Integer roomId) {
        //방이 있다면 넣어주고 없다면 생성하고 넣어줌
        return truthRooms.computeIfAbsent(roomId, k -> new TruthRoomDto());
    }

    @Override
    public void addMember(Integer roomId, String sessionId, String userName) {
        TruthRoomDto room = createOrGetRoom(roomId);
        room.getMembers().put(sessionId, userName);
        room.getReadyState().put(sessionId, false);
    }

    @Override
    public void removeMember(Integer roomId, String sessionId) {
        TruthRoomDto room = truthRooms.get(roomId);
        if (room != null) {
            //멤버 지우기
            room.getMembers().remove(sessionId);
            room.getReadyState().remove(sessionId);
        }
    }

    @Override
    public void setMemberReady(Integer roomId, String sessionId, boolean isReady) {
        TruthRoomDto room = truthRooms.get(roomId);
        if (room != null && room.getReadyState().containsKey(sessionId)) {
            room.getReadyState().put(sessionId, isReady);
        }
    }

    @Override
    public boolean areAllMemberReadey(Integer roomId) {
        TruthRoomDto room = truthRooms.get(roomId);
        //모두 true 이면 true 반환
        return room != null &&
                room.getReadyState().values().stream().allMatch(Boolean::booleanValue);
    }
}
