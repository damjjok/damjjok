package com.ssafy.server.controller;

import com.ssafy.server.dto.request.attendance.AttedanceListRquestDto;
import com.ssafy.server.dto.request.attendance.AttendanceCreateRequestDto;
import com.ssafy.server.dto.response.attendance.AttendanceCreateResponseDto;
import com.ssafy.server.dto.response.attendance.AttendanceListResponseDto;
import com.ssafy.server.dto.response.candy.CandyCreateResponseDto;
import com.ssafy.server.service.AttendanceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
        //System.out.println(requestBody.toString());
        ResponseEntity<? super AttendanceCreateResponseDto> response = attendanceService.create(requestBody);
        return response;
    }

    @GetMapping("/{challengeId}")
    @Operation(summary = "출석 목록 조회", description = "출석 목록을 조회합니다.",
            responses = { @ApiResponse(responseCode = "200", description = "출석 목록 조회성공",
                    content = @Content(schema = @Schema(implementation = AttendanceCreateResponseDto.class)))})
    public ResponseEntity<? super AttendanceListResponseDto> listAttendance(
            @PathVariable int challengeId
    ){
        AttedanceListRquestDto requestBody = new AttedanceListRquestDto();
        requestBody.setChallengeId(challengeId);
        return attendanceService.list(requestBody);
    }
}
