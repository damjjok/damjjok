package com.ssafy.server.controller;

import com.ssafy.server.dto.request.cheermsg.CheerMsgCreateRequestDto;
import com.ssafy.server.dto.response.cheermsg.CheerMsgCreateResponseDto;
import com.ssafy.server.service.CheerMsgService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/cheer-msg")
@RequiredArgsConstructor
public class CheerMsgController {

    private final CheerMsgService cheerMsgService;

    @PostMapping
    public ResponseEntity<? super CheerMsgCreateResponseDto> createMsg(
            @RequestBody CheerMsgCreateRequestDto requestBody){
        ResponseEntity<? super CheerMsgCreateResponseDto> response = cheerMsgService.create(requestBody);
        return response;
    }

}
