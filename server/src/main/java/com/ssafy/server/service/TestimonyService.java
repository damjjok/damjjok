package com.ssafy.server.service;

import com.ssafy.server.dto.request.TestimonyCreateRequestDto;
import com.ssafy.server.dto.response.TestimonyCreateResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


public interface TestimonyService {
    ResponseEntity<? super TestimonyCreateResponseDto> create(TestimonyCreateRequestDto dto);
}
