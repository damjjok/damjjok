package com.ssafy.server.service;

import com.ssafy.server.dto.request.CandyCreateRequestDto;
import com.ssafy.server.dto.response.CandyCreateResponseDto;
import org.springframework.http.ResponseEntity;

public interface CandyService {

    ResponseEntity<? super CandyCreateResponseDto> create(CandyCreateRequestDto dto);
}
