package com.ssafy.server.service;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.request.challenge.ChallengeChangeStatusRequestDto;
import com.ssafy.server.dto.request.challenge.ChallengeCreateRequestDto;
import com.ssafy.server.dto.request.challenge.ChallengeProfileModifyRequestDto;
import com.ssafy.server.dto.request.challenge.ChallengeRankRequestDto;
import com.ssafy.server.dto.response.challenge.*;
import org.springframework.http.ResponseEntity;

public interface ChallengeService {
    ResponseEntity<? super ChallengeCreateResponseDto> create(ChallengeCreateRequestDto dto);
    ResponseEntity<? super ChallengeProfileImageResponseDto> profileImages();
    ResponseEntity<? super ChallengeListByGroupIdResponseDto> challengeList(int groupId);
    ResponseEntity<? super ChallengeDetailResponseDto> challengeDetail (int challengeId);
    ResponseEntity<? super ChallengeMemberListResponseDto> challengeMemberList(int challengeId);
    ResponseEntity<? super ChallengeChangeStatusResponseDto> changeStatus(ChallengeChangeStatusRequestDto dto);
    ResponseEntity<? super ChallengeProfileModifyResponseDto> modifyProfile(int challengeId, ChallengeProfileModifyRequestDto dto);
    ResponseEntity<? super ChallengeRankResponseDto> challengeRank(ChallengeRankRequestDto dto);
    ResponseEntity<? super ChallengeSavedMoneyResponseDto> challengeSavedMoney(int challengeId);
}
