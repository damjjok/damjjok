package com.ssafy.server.service;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.request.challenge.ChallengeCreateRequestDto;
import com.ssafy.server.dto.request.challenge.ChallengeProfileModifyRequestDto;
import com.ssafy.server.dto.response.challenge.*;
import org.springframework.http.ResponseEntity;

public interface ChallengeService {
    ResponseEntity<? super ChallengeCreateResponseDto> create(ChallengeCreateRequestDto dto);
    ResponseEntity<? super ChallengeProfileImageResponseDto> profileImages();
    ResponseEntity<? super ChallengeListByGroupIdResponseDto> challengeList(int groupId);
    ResponseEntity<? super ChallengeDetailResponseDto> challengeDetail (int challengeId);
    ResponseEntity<? super ChallengeMemberListResponseDto> challengeMemberList(int challengeId);
    ResponseEntity<? super ChallengeEndResponseDto> changeStatus(int challengeId);
    ResponseEntity<? super ChallengeProfileModifyResponseDto> modifyProfile(int challengeId, ChallengeProfileModifyRequestDto dto);
}