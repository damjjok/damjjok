package com.ssafy.server.controller;


import com.ssafy.server.dto.request.test.AlarmRequestDto;
import com.ssafy.server.dto.response.test.AlarmResponseDto;
import com.ssafy.server.service.implement.FCMAlarmServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/test")
@RequiredArgsConstructor
public class TestController {

    private final FCMAlarmServiceImpl fcmNotificationService;

    @GetMapping("/")
    public String test(){
        System.out.println("TESTTEST");
        return "TEST";
    }

    @PostMapping("/alarm")
    public ResponseEntity<? super AlarmResponseDto> sendAlarmTest(@RequestBody AlarmRequestDto dto){
        String response = fcmNotificationService.sendNotification(dto.getToken(), dto.getTitle(), dto.getBody());
        return AlarmResponseDto.success(response);
    }

}
