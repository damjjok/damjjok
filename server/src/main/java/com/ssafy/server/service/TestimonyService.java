package com.ssafy.server.service;

import com.ssafy.server.dto.request.proof.*;
import com.ssafy.server.dto.response.proof.*;
import org.springframework.http.ResponseEntity;


public interface TestimonyService {
    ResponseEntity<? super TestimonyCreateResponseDto> create(TestimonyCreateRequestDto dto);
    ResponseEntity<? super TestimonyListResponseDto> list(TestimonyListRequestDto dto);
    ResponseEntity<? super TestimonyDetailResponseDto> detail(TestimonyDetailRequestDto dto);
    ResponseEntity<? super TestimonyModifyResponseDto> modify(TestimonyModifyRequestDto dto);
    ResponseEntity<? super TestimonyForTruthRoomResponseDto> listForTruthRoom(TestimonyForTruthRoomRequestDto dto);

}
