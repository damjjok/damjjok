package com.ssafy.server.controller;

import com.ssafy.server.dto.request.attendance.AttendanceCreateRequestDto;
import com.ssafy.server.dto.response.attendance.AttendanceCreateResponseDto;
import com.ssafy.server.dto.response.candy.CandyCreateResponseDto;
import com.ssafy.server.service.AttendanceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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
    @Operation(summary = "출석 생성", description = "출석 하기",
            responses = { @ApiResponse(responseCode = "200", description = "출석 성공",
                    content = @Content(schema = @Schema(implementation = AttendanceCreateResponseDto.class)))})
    public ResponseEntity<? super AttendanceCreateResponseDto> createAttendance(
            @RequestBody AttendanceCreateRequestDto requestBody){
        System.out.println(requestBody.toString());

        ResponseEntity<? super AttendanceCreateResponseDto> response = attendanceService.create(requestBody);
        return response;
    }
}
