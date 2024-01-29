package com.ssafy.server.service;

import com.ssafy.server.dto.request.ScheduleCreateRequestDto;
import com.ssafy.server.dto.response.ScheduleCreateResponseDto;
import com.ssafy.server.dto.schedule.ScheduleDto;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

public interface ScheduleService {
    ResponseEntity<? super Optional<ScheduleDto>> getSchedule(Integer ChallengeId);
    ResponseEntity<? super ScheduleCreateResponseDto> createSchedule(ScheduleCreateRequestDto requestDto);
}
