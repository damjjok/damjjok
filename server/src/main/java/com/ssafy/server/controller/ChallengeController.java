package com.ssafy.server.controller;

import com.ssafy.server.dto.request.challenge.ChallengeCreateRequestDto;
import com.ssafy.server.dto.response.challenge.ChallengeCreateResponseDto;
import com.ssafy.server.dto.response.challenge.ChallengeProfileImageResponseDto;
import com.ssafy.server.service.ChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/challenge")
@RequiredArgsConstructor
public class ChallengeController {

    private final ChallengeService challengeService;

    @PostMapping("/create")
    public ResponseEntity<? super ChallengeCreateResponseDto> create(@RequestBody ChallengeCreateRequestDto dto){
        ResponseEntity<? super ChallengeCreateResponseDto> response = challengeService.create(dto);
        return response;
    }

    @GetMapping("profile-images")
    public ResponseEntity<? super ChallengeProfileImageResponseDto> profileImages(){
        ResponseEntity<? super ChallengeProfileImageResponseDto> response = challengeService.profileImages();
        return response;
    }
}
