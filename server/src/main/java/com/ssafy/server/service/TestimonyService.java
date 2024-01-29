package com.ssafy.server.service;

import com.ssafy.server.dto.request.TestimonyCreateRequestDto;
import com.ssafy.server.dto.request.TestimonyDetailRequestDto;
import com.ssafy.server.dto.request.TestimonyListRequestDto;
import com.ssafy.server.dto.request.TestimonyModifyRequestDto;
import com.ssafy.server.dto.response.TestimonyCreateResponseDto;
import com.ssafy.server.dto.response.TestimonyDetailResponseDto;
import com.ssafy.server.dto.response.TestimonyListResponseDto;
import com.ssafy.server.dto.response.TestimonyModifyResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


public interface TestimonyService {
    ResponseEntity<? super TestimonyCreateResponseDto> create(TestimonyCreateRequestDto dto);
    ResponseEntity<? super TestimonyListResponseDto> list(TestimonyListRequestDto dto);
    ResponseEntity<? super TestimonyDetailResponseDto> detail(TestimonyDetailRequestDto dto);
    ResponseEntity<? super TestimonyModifyResponseDto> modify(TestimonyModifyRequestDto dto);
}
