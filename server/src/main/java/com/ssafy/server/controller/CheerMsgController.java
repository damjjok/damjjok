package com.ssafy.server.controller;

import com.ssafy.server.dto.request.cheermsg.CheerMsgCreateRequestDto;
import com.ssafy.server.dto.request.cheermsg.CheerMsgListRequestDto;
import com.ssafy.server.dto.response.candy.CandyCountResponseDto;
import com.ssafy.server.dto.response.cheermsg.CheerMsgCreateResponseDto;
import com.ssafy.server.dto.response.cheermsg.CheerMsgListResponseDto;
import com.ssafy.server.service.CheerMsgService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/cheer-msg")
@RequiredArgsConstructor
public class CheerMsgController {

    private final CheerMsgService cheerMsgService;

    @PostMapping
    @Operation(summary = "응원 메시지 작성", description = "응원 메시지를 작성 합니다.",
            responses = { @ApiResponse(responseCode = "200", description = "응원 메시지 작성 성공",
                    content = @Content(schema = @Schema(implementation = CheerMsgCreateResponseDto.class)))})
    public ResponseEntity<? super CheerMsgCreateResponseDto> createMsg(
            @RequestBody CheerMsgCreateRequestDto requestBody){
        ResponseEntity<? super CheerMsgCreateResponseDto> response = cheerMsgService.create(requestBody);
        return response;
    }

    @GetMapping("/{challengeId}")
    @Operation(summary = "응원 메시지 목록 조회", description = "응원 메시지 목록을 조회합니다.",
            responses = { @ApiResponse(responseCode = "200", description = "응원 메시지 목록 조회 성공",
                    content = @Content(schema = @Schema(implementation = CheerMsgListResponseDto.class)))})
    public ResponseEntity<? super CheerMsgListResponseDto> listMsg(
            @PathVariable int challengeId){
        CheerMsgListRequestDto requestBody = new CheerMsgListRequestDto();
        requestBody.setChallengeId(challengeId);
        ResponseEntity<? super CheerMsgListResponseDto> response = cheerMsgService.list(requestBody);
        return response;
    }

}
