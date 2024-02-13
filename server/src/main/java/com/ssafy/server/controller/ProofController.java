package com.ssafy.server.controller;


import com.ssafy.server.dto.request.proof.*;
import com.ssafy.server.dto.response.candy.CandyCountResponseDto;
import com.ssafy.server.dto.response.proof.*;
import com.ssafy.server.service.EvidenceService;
import com.ssafy.server.service.TestimonyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
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
    @Operation(summary = "증언 생성", description = "증언을 생성합니다.",
            responses = { @ApiResponse(responseCode = "200", description = "증언 생성 성공",
                    content = @Content(schema = @Schema(implementation = TestimonyCreateResponseDto.class)))})
    public ResponseEntity<? super TestimonyCreateResponseDto> createTestimony(
            @RequestBody @Valid TestimonyCreateRequestDto requestBody){
        ResponseEntity<? super TestimonyCreateResponseDto> response = testimonyService.create(requestBody);
        return response;
    }

    @GetMapping("/testimony/{challengeId}")
    @Operation(summary = "증언 목록 조회", description = "증언 목록을 조회합니다.",
            responses = { @ApiResponse(responseCode = "200", description = "증언 목록 조회 성공",
                    content = @Content(schema = @Schema(implementation = TestimonyListResponseDto.class)))})
    public ResponseEntity<? super TestimonyListResponseDto> listTestimonyForTruthRoom(@PathVariable int challengeId){
        TestimonyListRequestDto requestBody = new TestimonyListRequestDto();
        requestBody.setChallengeId(challengeId);
        ResponseEntity<? super TestimonyListResponseDto> response = testimonyService.list(requestBody);
        return response;
    }

    @GetMapping("/testimony/truth-room/{challengeId}")
    @Operation(summary = "진실의 방 증언 목록 조회", description = "진실의 방 증언 목록을 조회합니다.",
            responses = { @ApiResponse(responseCode = "200", description = "증언 목록 조회 성공",
                    content = @Content(schema = @Schema(implementation = TestimonyForTruthRoomResponseDto.class)))})
    public ResponseEntity<? super TestimonyForTruthRoomResponseDto> listTestimony(@PathVariable int challengeId){
        TestimonyForTruthRoomRequestDto requestBody = new TestimonyForTruthRoomRequestDto();
        requestBody.setChallengeId(challengeId);
        ResponseEntity<? super TestimonyForTruthRoomResponseDto> response = testimonyService.listForTruthRoom(requestBody);
        return response;
    }

    @GetMapping("/testimony/detail/{testimonyId}")
    @Operation(summary = "증언 상세 조회", description = "증언을 상세 조회합니다.",
            responses = { @ApiResponse(responseCode = "200", description = "증언 상세 조회 성공",
                    content = @Content(schema = @Schema(implementation = TestimonyDetailResponseDto.class)))})
    public ResponseEntity<? super TestimonyDetailResponseDto> detailTestimony(@PathVariable int testimonyId){
        TestimonyDetailRequestDto requestBody = new TestimonyDetailRequestDto();
        requestBody.setTestimonyId(testimonyId);
        ResponseEntity<? super TestimonyDetailResponseDto> response = testimonyService.detail(requestBody);
        return response;
    }

    @PutMapping("/testimony")
    @Operation(summary = "증언 수정", description = "증언을 수정합니다.",
            responses = { @ApiResponse(responseCode = "200", description = "증언 수정 성공",
                    content = @Content(schema = @Schema(implementation = TestimonyModifyResponseDto.class)))})
    public ResponseEntity<? super TestimonyModifyResponseDto> modifyTestimony(@RequestBody @Valid TestimonyModifyRequestDto requestBody){
        ResponseEntity<? super TestimonyModifyResponseDto>  response = testimonyService.modify(requestBody);
        return response;
    }


    // Evidence

    @PostMapping("/evidence")
    @Operation(summary = "증거 생성 (enctype=\"multipart/form-data\")", description = "증거을 생성합니다.",
            responses = { @ApiResponse(responseCode = "200", description = "증언 생성 성공",
                    content = @Content(schema = @Schema(implementation = EvidenceCreateResponseDto.class)))})
    public ResponseEntity<? super EvidenceCreateResponseDto> createEvidence(@ModelAttribute @Valid EvidenceCreateRequestDto requestBody){
        ResponseEntity<? super EvidenceCreateResponseDto> response = evidenceService.createEvidence(requestBody);
        return response;
    }

    @PutMapping("/evidence")
    @Operation(summary = "증거 수정 (enctype=\"multipart/form-data\")", description = "증언을 수정합니다.",
            responses = { @ApiResponse(responseCode = "200", description = "증언 수정 성공",
                    content = @Content(schema = @Schema(implementation = EvidenceModifyResponseDto.class)))})
    public ResponseEntity<? super EvidenceModifyResponseDto> modifyEvidence(@ModelAttribute @Valid EvidenceModifyRequestDto requestBody){
        ResponseEntity<? super EvidenceModifyResponseDto> response = evidenceService.modifyEvidence(requestBody);
        return response;
    }

    @GetMapping("/evidence/detail/{evidenceId}")
    @Operation(summary = "증거 상세", description = "증거 상세정보를 받아옵니다.",
            responses = { @ApiResponse(responseCode = "200", description = "증거 조회 성공",
                    content = @Content(schema = @Schema(implementation = EvidenceDetailResponseDto.class)))})
    public ResponseEntity<? super EvidenceDetailResponseDto> detailEvidence(@PathVariable int evidenceId){
        EvidenceDetailRequestDto requestBody = new EvidenceDetailRequestDto();
        requestBody.setEvidenceId(evidenceId);
        ResponseEntity<? super EvidenceDetailResponseDto> response = evidenceService.detailEvidence(requestBody);
        return response;
    }

    @GetMapping("/evidence/{challengeId}")
    @Operation(summary = "증거 목록", description = "증거 목록을 받아옵니다.",
            responses = { @ApiResponse(responseCode = "200", description = "증거 목록 조회 성공",
                    content = @Content(schema = @Schema(implementation = EvidenceListResponseDto.class)))})
    public ResponseEntity<? super EvidenceListResponseDto> listEvidence(@PathVariable int challengeId){
        EvidenceListRequestDto requestBody = new EvidenceListRequestDto();
        requestBody.setChallengeId(challengeId);
        ResponseEntity<? super EvidenceListResponseDto> response = evidenceService.listEvidence(requestBody);
        return response;
    }
    @GetMapping("/evidence/truth-room/{challengeId}")
    @Operation(summary = "진실의 방 증거 목록", description = "진실의 방 증거 목록을 받아옵니다.",
            responses = { @ApiResponse(responseCode = "200", description = "진실의 방증거 목록 조회 성공",
                    content = @Content(schema = @Schema(implementation = EvidenceForTruthRoomResponseDto.class)))})
    public ResponseEntity<? super EvidenceForTruthRoomResponseDto> listEvidenceForTruthRoom(@PathVariable int challengeId){
        EvidenceForTruthRoomRequestDto requestBody = new EvidenceForTruthRoomRequestDto();
        requestBody.setChallengeId(challengeId);
        ResponseEntity<? super EvidenceForTruthRoomResponseDto> response = evidenceService.listEvidenceForTruthRoom(requestBody);
        return response;
    }



}
