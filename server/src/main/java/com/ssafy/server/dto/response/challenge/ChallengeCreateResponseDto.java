package com.ssafy.server.dto.response.challenge;

import com.ssafy.server.common.ResponseCode;
import com.ssafy.server.common.ResponseMessage;
import com.ssafy.server.dto.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class ChallengeCreateResponseDto extends ResponseDto {

    public ChallengeCreateResponseDto(){
        super();
    }

    public static ResponseEntity<? super ChallengeCreateResponseDto> success(){
        ChallengeCreateResponseDto responseBody = new ChallengeCreateResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<? super ChallengeCreateResponseDto> duplicateCreateChallenge(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.VALIDATION_FAIL, "현재 진행중인 챌린지가 존재합니다.");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }

}
