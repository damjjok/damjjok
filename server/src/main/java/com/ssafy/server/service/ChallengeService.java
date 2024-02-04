package com.ssafy.server.service;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.request.challenge.ChallengeCreateRequestDto;
import com.ssafy.server.dto.response.challenge.ChallengeCreateResponseDto;
import org.springframework.http.ResponseEntity;

public interface ChallengeService {
    ResponseEntity<? super ChallengeCreateResponseDto> create(ChallengeCreateRequestDto dto);
}
