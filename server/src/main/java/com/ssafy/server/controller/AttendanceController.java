package com.ssafy.server.controller;

import com.ssafy.server.dto.request.attendance.AttendanceCreateRequestDto;
import com.ssafy.server.dto.response.attendance.AttendanceCreateResponseDto;
import com.ssafy.server.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;
    @PostMapping
    public ResponseEntity<? super AttendanceCreateResponseDto> createAttendance(
            @RequestBody AttendanceCreateRequestDto requestBody){
        System.out.println(requestBody.toString());

        ResponseEntity<? super AttendanceCreateResponseDto> response = attendanceService.create(requestBody);
        return response;
    }
}
