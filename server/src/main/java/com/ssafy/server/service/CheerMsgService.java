package com.ssafy.server.service;

import com.ssafy.server.dto.request.cheermsg.CheerMsgCreateRequestDto;
import com.ssafy.server.dto.request.cheermsg.CheerMsgListRequestDto;
import com.ssafy.server.dto.response.cheermsg.CheerMsgCreateResponseDto;
import com.ssafy.server.dto.response.cheermsg.CheerMsgListResponseDto;
import org.springframework.http.ResponseEntity;

public interface CheerMsgService {
    ResponseEntity<? super CheerMsgCreateResponseDto> create(CheerMsgCreateRequestDto dto);
    ResponseEntity<? super CheerMsgListResponseDto> list(CheerMsgListRequestDto dto);
}
