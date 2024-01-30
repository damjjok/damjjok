package com.ssafy.server.service;

import com.ssafy.server.dto.request.cheermsg.CheerMsgCreateRequestDto;
import com.ssafy.server.dto.response.cheermsg.CheerMsgCreateResponseDto;
import org.springframework.http.ResponseEntity;

public interface CheerMsgService {
    public ResponseEntity<? super CheerMsgCreateResponseDto> create(CheerMsgCreateRequestDto dto);
}
