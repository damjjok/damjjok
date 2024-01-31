package com.ssafy.server.controller;


import com.ssafy.server.dto.request.candy.CandyCountRequestDto;
import com.ssafy.server.dto.request.candy.CandyCreateRequestDto;
import com.ssafy.server.dto.response.candy.CandyCountResponseDto;
import com.ssafy.server.dto.response.candy.CandyCreateResponseDto;
import com.ssafy.server.service.CandyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{challengeId}")
    public ResponseEntity<? super CandyCountResponseDto> countCandy(@PathVariable int challengeId){
        CandyCountRequestDto requestBody = new CandyCountRequestDto();
        requestBody.setChallengeId(challengeId);
        ResponseEntity<? super CandyCountResponseDto> response = candyService.count(requestBody);
        return response;
    }
}
