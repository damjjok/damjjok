package com.ssafy.server.controller;


import com.ssafy.server.dto.request.CandyCreateRequestDto;
import com.ssafy.server.dto.response.CandyCreateResponseDto;
import com.ssafy.server.service.CandyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/candy")
@RequiredArgsConstructor
public class CandyController {

    private final CandyService candyService;

    @PostMapping
    public ResponseEntity<? super CandyCreateResponseDto> createCandy(@RequestBody CandyCreateRequestDto requestBody){
        ResponseEntity<? super CandyCreateResponseDto> response = candyService.create(requestBody);
        return response;
    }
}
