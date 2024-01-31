package com.ssafy.server.controller;


import com.ssafy.server.dto.request.proof.*;
import com.ssafy.server.dto.response.proof.*;
import com.ssafy.server.service.EvidenceService;
import com.ssafy.server.service.TestimonyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/proof")
@RequiredArgsConstructor
public class ProofController {

    private final TestimonyService testimonyService;
    private final EvidenceService evidenceService;

    @PostMapping("/testimony")
    public ResponseEntity<? super TestimonyCreateResponseDto> createTestimony(@RequestBody TestimonyCreateRequestDto requestBody){
        ResponseEntity<? super TestimonyCreateResponseDto> response = testimonyService.create(requestBody);
        return response;
    }

    @GetMapping("/testimony/{challengeId}")
    public ResponseEntity<? super TestimonyListResponseDto> listTestimony(@PathVariable int challengeId){
        TestimonyListRequestDto requestBody = new TestimonyListRequestDto();
        requestBody.setChallengeId(challengeId);
        ResponseEntity<? super TestimonyListResponseDto> response = testimonyService.list(requestBody);
        return response;
    }

    @GetMapping("/testimony/detail/{testimonyId}")
    public ResponseEntity<? super TestimonyDetailResponseDto> detailTestimony(@PathVariable int testimonyId){
        TestimonyDetailRequestDto requestBody = new TestimonyDetailRequestDto();
        requestBody.setTestimonyId(testimonyId);
        ResponseEntity<? super TestimonyDetailResponseDto> response = testimonyService.detail(requestBody);
        return response;
    }

    @PutMapping("/testimony")
    public ResponseEntity<? super TestimonyModifyResponseDto> modifyTestimony(@RequestBody TestimonyModifyRequestDto requestBody){
        ResponseEntity<? super TestimonyModifyResponseDto>  response = testimonyService.modify(requestBody);
        return response;
    }


    // Evidence

    @PostMapping("/evidence")
    public ResponseEntity<? super EvidenceCreateResponseDto> createEvidence(@ModelAttribute EvidenceCreateRequestDto requestBody){
        ResponseEntity<? super EvidenceCreateResponseDto> response = evidenceService.createEvidence(requestBody);
        return response;
    }

    @PutMapping("/evidence")
    public ResponseEntity<? super EvidenceModifyResponseDto> modifyEvidence(@ModelAttribute EvidenceModifyRequestDto requestBody){
        ResponseEntity<? super EvidenceModifyResponseDto> response = evidenceService.modifyEvidence(requestBody);
        return response;
    }

    @GetMapping("/evidence/detail/{evidenceId}")
    public ResponseEntity<? super EvidenceDetailResponseDto> detailEvidence(@PathVariable int evidenceId){
        EvidenceDetailRequestDto requestBody = new EvidenceDetailRequestDto();
        requestBody.setEvidenceId(evidenceId);
        ResponseEntity<? super EvidenceDetailResponseDto> response = evidenceService.detailEvidence(requestBody);
        return response;
    }

    @GetMapping("/evidence/{challengeId}")
    public ResponseEntity<? super EvidenceListResponseDto> listEvidence(@PathVariable int challengeId){
        EvidenceListRequestDto requestBody = new EvidenceListRequestDto();
        requestBody.setChallengeId(challengeId);
        ResponseEntity<? super EvidenceListResponseDto> response = evidenceService.listEvidence(requestBody);
        return response;
    }



}
