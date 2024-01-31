package com.ssafy.server.service;

import com.ssafy.server.dto.request.attendance.AttendanceCreateRequestDto;
import com.ssafy.server.dto.response.attendance.AttendanceCreateResponseDto;
import org.springframework.http.ResponseEntity;

public interface AttendanceService {

    ResponseEntity<? super AttendanceCreateResponseDto> create(AttendanceCreateRequestDto dto);
}
