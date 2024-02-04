package com.ssafy.server.service;

import com.ssafy.server.dto.websocket.TruthRoomDto;

public interface NextStageService {
    void setEvidenceNext(Integer roomId, String sessionId, boolean isNext);
    //증거 리스트에서 다음단계 누른 사람 수 세줌
    Integer countEvidenceNext(Integer roomId);
    boolean checkAllEvidenceNextReady(Integer roomId);
    void setFinalArgumentReady(Integer roomId, String sessionId, Boolean isReady);
    Integer countFinalArgumentReady(Integer roomId);
    boolean checkAllFinalArgumentReady(Integer roomId);

}
