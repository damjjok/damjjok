package com.ssafy.server.service;

import com.ssafy.server.dto.request.proof.*;
import com.ssafy.server.dto.response.proof.*;
import org.springframework.http.ResponseEntity;

public interface EvidenceService {
    ResponseEntity<? super EvidenceCreateResponseDto> createEvidence(EvidenceCreateRequestDto dto);
    ResponseEntity<? super EvidenceModifyResponseDto> modifyEvidence(EvidenceModifyRequestDto dto);
    ResponseEntity<? super EvidenceDetailResponseDto> detailEvidence(EvidenceDetailRequestDto dto);
    ResponseEntity<? super EvidenceListResponseDto> listEvidence(EvidenceListRequestDto dto);
    ResponseEntity<? super EvidenceForTruthRoomResponseDto> listEvidenceForTruthRoom(EvidenceForTruthRoomRequestDto dto);
}
