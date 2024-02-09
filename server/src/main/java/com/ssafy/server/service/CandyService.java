package com.ssafy.server.service;

import com.ssafy.server.dto.request.candy.BestCheeringMemberRequestDto;
import com.ssafy.server.dto.request.candy.CandyCountRequestDto;
import com.ssafy.server.dto.request.candy.CandyCreateRequestDto;
import com.ssafy.server.dto.response.candy.BestCheeringMemberResponseDto;
import com.ssafy.server.dto.response.candy.CandyCountResponseDto;
import com.ssafy.server.dto.response.candy.CandyCreateResponseDto;
import org.springframework.http.ResponseEntity;

public interface CandyService {

    ResponseEntity<? super CandyCreateResponseDto> create(CandyCreateRequestDto dto);
    ResponseEntity<? super CandyCountResponseDto> count(CandyCountRequestDto dto);
    ResponseEntity<? super BestCheeringMemberResponseDto> bestMember(BestCheeringMemberRequestDto dto);
}
