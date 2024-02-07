package com.ssafy.server.controller;

import com.ssafy.server.dto.request.schedule.ScheduleCreateRequestDto;
import com.ssafy.server.dto.request.schedule.ScheduleDetailRequestDto;
import com.ssafy.server.dto.response.schedule.ScheduleCreateResponseDto;
import com.ssafy.server.dto.response.schedule.ScheduleDetailResponseDto;
import com.ssafy.server.service.ScheduleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;


@Tag(name = "일정", description = "진실의 방 일정 관련 api")
@RestController
@RequestMapping("/api/v1/schedule")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    @Operation(summary = "일정 상세", description = "해당 챌린지의 시작되지 않은 진실의 방 일정을 가져옵니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "SU", description = "성공", content = @Content(schema = @Schema(implementation = ScheduleDetailResponseDto.class)))
    })
    @GetMapping("/{challengeId}")
    public ResponseEntity<? super Optional<ScheduleDetailResponseDto>> getSchedule(@PathVariable Integer challengeId) {
        ScheduleDetailRequestDto requestBody = new ScheduleDetailRequestDto();
        requestBody.setChallengeId(challengeId);
        ResponseEntity<? super Optional<ScheduleDetailResponseDto>> response = scheduleService.getSchedule(requestBody);
        return response;
    }

    @Operation(summary = "일정 생성", description = "해당 챌린지의 진실의 방 일정을 생성합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "VF", description = "Validation Fail : 담쪽이가 아님", content = @Content(schema = @Schema(implementation = ScheduleCreateResponseDto.class))),
            @ApiResponse(responseCode = "200", description = "성공", content = @Content(schema = @Schema(implementation = ScheduleCreateResponseDto.class)))
    })
    @PostMapping
    public ResponseEntity<? super ScheduleCreateResponseDto> createSchedule(@RequestBody @Valid ScheduleCreateRequestDto requestBody) {
        ResponseEntity<? super ScheduleCreateResponseDto> response = scheduleService.createSchedule(requestBody);
        return scheduleService.createSchedule(requestBody);
    }

}
