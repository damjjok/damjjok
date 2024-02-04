package com.ssafy.server.service;

import com.ssafy.server.dto.websocket.TruthRoomDto;

public interface NextStageService {
    void setEvidenceNext(Integer roomId, String sessionId, boolean isNext);

    //증거 리스트에서 다음단계 누른 사람 수 세줌
    Integer cntEvidenceNext(Integer roomId);
    void setFinalArgumentReady(Integer roomId, String sessionId, Boolean isReady);
    boolean checkAllFinalArgumentReady(Integer roomId);



}
