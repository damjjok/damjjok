package com.ssafy.server.service;

import com.ssafy.server.dto.request.schedule.ScheduleCreateRequestDto;
import com.ssafy.server.dto.request.schedule.ScheduleDetailRequestDto;
import com.ssafy.server.dto.response.schedule.ScheduleCreateResponseDto;
import com.ssafy.server.dto.response.schedule.ScheduleDetailResponseDto;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

public interface ScheduleService {
    ResponseEntity<? super Optional<ScheduleDetailResponseDto>> getSchedule(ScheduleDetailRequestDto dto);

    ResponseEntity<? super ScheduleCreateResponseDto> createSchedule(ScheduleCreateRequestDto dto);
}
