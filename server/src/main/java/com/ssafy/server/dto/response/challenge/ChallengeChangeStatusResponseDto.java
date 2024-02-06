package com.ssafy.server.dto.response.challenge;

import com.ssafy.server.dto.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ChallengeChangeStatusResponseDto extends ResponseDto {
    public ChallengeChangeStatusResponseDto(){
        super();
    }

    public static ResponseEntity<? super ChallengeChangeStatusResponseDto> success(){
        ChallengeChangeStatusResponseDto responseBody = new ChallengeChangeStatusResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
