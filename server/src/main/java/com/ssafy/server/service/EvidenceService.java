package com.ssafy.server.service;

import com.ssafy.server.dto.request.proof.EvidenceCreateRequestDto;
import com.ssafy.server.dto.request.proof.EvidenceModifyRequestDto;
import com.ssafy.server.dto.response.proof.EvidenceCreateResponseDto;
import com.ssafy.server.dto.response.proof.EvidenceModifyResponseDto;
import org.springframework.http.ResponseEntity;

public interface EvidenceService {
    ResponseEntity<? super EvidenceCreateResponseDto> createEvidence(EvidenceCreateRequestDto dto);
    ResponseEntity<? super EvidenceModifyResponseDto> modifyEvidence(EvidenceModifyRequestDto dto);
}
