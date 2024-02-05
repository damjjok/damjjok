package com.ssafy.server.service;

import com.ssafy.server.dto.request.attendance.AttedanceListRquestDto;
import com.ssafy.server.dto.request.attendance.AttendanceCreateRequestDto;
import com.ssafy.server.dto.response.attendance.AttendanceCreateResponseDto;
import com.ssafy.server.dto.response.attendance.AttendanceListResponseDto;
import org.springframework.http.ResponseEntity;

public interface AttendanceService {

    ResponseEntity<? super AttendanceCreateResponseDto> create(AttendanceCreateRequestDto dto);
    ResponseEntity<? super AttendanceListResponseDto> list(AttedanceListRquestDto dto);
}
