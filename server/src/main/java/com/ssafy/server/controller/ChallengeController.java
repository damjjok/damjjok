package com.ssafy.server.controller;

import com.ssafy.server.dto.request.challenge.ChallengeChangeStatusRequestDto;
import com.ssafy.server.dto.request.challenge.ChallengeCreateRequestDto;
import com.ssafy.server.dto.request.challenge.ChallengeProfileModifyRequestDto;
import com.ssafy.server.dto.request.challenge.ChallengeRankRequestDto;
import com.ssafy.server.dto.response.challenge.*;
import com.ssafy.server.service.ChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/challenge")
@RequiredArgsConstructor
public class ChallengeController {

    private final ChallengeService challengeService;

    @PostMapping("/create")
    public ResponseEntity<? super ChallengeCreateResponseDto> create(@RequestBody ChallengeCreateRequestDto dto){
        ResponseEntity<? super ChallengeCreateResponseDto> response = challengeService.create(dto);
        return response;
    }

    @GetMapping("/profile-images")
    public ResponseEntity<? super ChallengeProfileImageResponseDto> profileImages(){
        ResponseEntity<? super ChallengeProfileImageResponseDto> response = challengeService.profileImages();
        return response;
    }

    @GetMapping("/list/{groupId}")
    public ResponseEntity<? super ChallengeListByGroupIdResponseDto> challengeList(@PathVariable int groupId){
        ResponseEntity<? super ChallengeListByGroupIdResponseDto> response = challengeService.challengeList(groupId);
        return response;
    }

    @GetMapping("/{challengeId}/detail")
    public ResponseEntity<? super ChallengeDetailResponseDto> challengeDetail(@PathVariable int challengeId){
        ResponseEntity<? super ChallengeDetailResponseDto> response = challengeService.challengeDetail(challengeId);
        return response;
    }

    @GetMapping("/{challengeId}/member-list")
    public ResponseEntity<? super ChallengeMemberListResponseDto> challengeMemberList(@PathVariable int challengeId){
        ResponseEntity<? super ChallengeMemberListResponseDto> response = challengeService.challengeMemberList(challengeId);
        return response;
    }

    @PatchMapping("/change/status")
    public ResponseEntity<? super ChallengeChangeStatusResponseDto> changeStatus(@RequestBody ChallengeChangeStatusRequestDto dto){
        ResponseEntity<? super ChallengeChangeStatusResponseDto> response = challengeService.changeStatus(dto);
        return response;
    }

    @PatchMapping("/{challengeId}/profile-modify")
    public ResponseEntity<? super ChallengeProfileModifyResponseDto> modifyProfile(@PathVariable int challengeId, @RequestBody ChallengeProfileModifyRequestDto dto){
        ResponseEntity<? super ChallengeProfileModifyResponseDto> response = challengeService.modifyProfile(challengeId,dto);
        return response;
    }

    @GetMapping("/{challengeId}/ranking")
    public ResponseEntity<? super ChallengeRankResponseDto> challengeRank(@PathVariable int challengeId){
        ChallengeRankRequestDto dto = new ChallengeRankRequestDto(challengeId);
        ResponseEntity<? super ChallengeRankResponseDto> response = challengeService.challengeRank(dto);
        return response;
    }
}
