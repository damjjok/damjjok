package com.ssafy.server.controller;

import com.ssafy.server.dto.request.ScheduleCreateRequestDto;
import com.ssafy.server.dto.request.ScheduleDetailRequestDto;
import com.ssafy.server.dto.response.ScheduleCreateResponseDto;
import com.ssafy.server.dto.schedule.ScheduleDto;
import com.ssafy.server.service.ScheduleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/schedule")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    @GetMapping("/{challengeId}")
    public ResponseEntity<? super Optional<ScheduleDto>> getSchedule(@PathVariable Integer challengeId) {
        ScheduleDetailRequestDto requestBody = new ScheduleDetailRequestDto();
        requestBody.setChallengeId(challengeId);
        ResponseEntity<? super Optional<ScheduleDto>> response = scheduleService.getSchedule(requestBody);
        return response;
    }


    @PostMapping
    public ResponseEntity<? super ScheduleCreateResponseDto> createSchedule(@RequestBody @Valid ScheduleCreateRequestDto requestBody) {
        ResponseEntity<? super ScheduleCreateResponseDto> response = scheduleService.createSchedule(requestBody);
        return scheduleService.createSchedule(requestBody);
    }

}
