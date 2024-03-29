package com.ssafy.server.controller;

import com.ssafy.server.dto.request.challenge.ChallengeChangeStatusRequestDto;
import com.ssafy.server.dto.request.challenge.ChallengeCreateRequestDto;
import com.ssafy.server.dto.request.challenge.ChallengeProfileModifyRequestDto;
import com.ssafy.server.dto.request.challenge.ChallengeRankRequestDto;
import com.ssafy.server.dto.response.challenge.*;
import com.ssafy.server.service.ChallengeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/challenge")
@RequiredArgsConstructor
public class ChallengeController {

    private final ChallengeService challengeService;

    @PostMapping("/create")
    @Operation(summary = "챌린지 생성", description = "챌린지 생성함",
            responses = { @ApiResponse(responseCode = "200", description = "챌린지 생성 성공",
                    content = @Content(schema = @Schema(implementation = ChallengeCreateResponseDto.class)))})
    public ResponseEntity<? super ChallengeCreateResponseDto> create(@RequestBody @Valid ChallengeCreateRequestDto dto){
        ResponseEntity<? super ChallengeCreateResponseDto> response = challengeService.create(dto);
        return response;
    }

//    @GetMapping("/profile-images")
//    @Operation(summary = "프로필 이미지들 반환", description = "서버에 있는 모든 프로필 이미지들 반환함",
//            responses = { @ApiResponse(responseCode = "200", description = "이미지들 반환 성공",
//                    content = @Content(schema = @Schema(implementation = ChallengeProfileImageResponseDto.class)))})
//    public ResponseEntity<? super ChallengeProfileImageResponseDto> profileImages(){
//        ResponseEntity<? super ChallengeProfileImageResponseDto> response = challengeService.profileImages();
//        return response;
//    }

    @GetMapping("/list/{groupId}")
    @Operation(summary = "특정 groupId의 모든 챌린지 리스트 반환", description = "특정 groupId의 모든 챌린지 리스트 반환",
            responses = { @ApiResponse(responseCode = "200", description = "챌린지 반환 성공",
                    content = @Content(schema = @Schema(implementation = ChallengeListByGroupIdResponseDto.class)))})
    public ResponseEntity<? super ChallengeListByGroupIdResponseDto> challengeList(@PathVariable int groupId){
        ResponseEntity<? super ChallengeListByGroupIdResponseDto> response = challengeService.challengeList(groupId);
        return response;
    }

    @GetMapping("/{challengeId}/detail")
    @Operation(summary = "특정 챌린지 디테일 반환", description = "특정 챌린지 challengeId로 디테일 반환",
            responses = { @ApiResponse(responseCode = "200", description = "챌린지 반환 성공",
                    content = @Content(schema = @Schema(implementation = ChallengeDetailResponseDto.class)))})
    public ResponseEntity<? super ChallengeDetailResponseDto> challengeDetail(@PathVariable int challengeId){
        ResponseEntity<? super ChallengeDetailResponseDto> response = challengeService.challengeDetail(challengeId);
        return response;
    }

    @GetMapping("/{challengeId}/member-list")
    @Operation(summary = "특정 챌린지 멤버 리스트 반환", description = "특정 챌린지 멤버 리스트 반환",
            responses = { @ApiResponse(responseCode = "200", description = "챌린지 멤버 리스트 반환 성공",
                    content = @Content(schema = @Schema(implementation = ChallengeMemberListResponseDto.class)))})
    public ResponseEntity<? super ChallengeMemberListResponseDto> challengeMemberList(@PathVariable int challengeId){
        ResponseEntity<? super ChallengeMemberListResponseDto> response = challengeService.challengeMemberList(challengeId);
        return response;
    }

    @PatchMapping("/change/status")
    public ResponseEntity<? super ChallengeChangeStatusResponseDto> changeStatus(@RequestBody @Valid ChallengeChangeStatusRequestDto dto){
        ResponseEntity<? super ChallengeChangeStatusResponseDto> response = challengeService.changeStatus(dto);
        return response;
    }

    @PatchMapping("/{challengeId}/profile-modify")
    @Operation(summary = "특정 챌린지 프로필 수정", description = "특정 챌린지 프로필 수정함",
            responses = { @ApiResponse(responseCode = "200", description = "챌린지 프로필 변경 성공",
                    content = @Content(schema = @Schema(implementation = ChallengeProfileModifyResponseDto.class)))})
    public ResponseEntity<? super ChallengeProfileModifyResponseDto> modifyProfile(@PathVariable int challengeId, @RequestBody @Valid ChallengeProfileModifyRequestDto dto){
        ResponseEntity<? super ChallengeProfileModifyResponseDto> response = challengeService.modifyProfile(challengeId,dto);
        return response;
    }

    @GetMapping("/{challengeId}/ranking")
    public ResponseEntity<? super ChallengeRankResponseDto> challengeRank(@PathVariable int challengeId){
        ChallengeRankRequestDto dto = new ChallengeRankRequestDto(challengeId);
        ResponseEntity<? super ChallengeRankResponseDto> response = challengeService.challengeRank(dto);
        return response;
    }

    @GetMapping("/{challengeId}/savedMoney")
    public ResponseEntity<? super ChallengeSavedMoneyResponseDto> challengeSavedMoney(@PathVariable int challengeId){
        ResponseEntity<? super ChallengeSavedMoneyResponseDto> response = challengeService.challengeSavedMoney(challengeId);
        return response;
    }
}
