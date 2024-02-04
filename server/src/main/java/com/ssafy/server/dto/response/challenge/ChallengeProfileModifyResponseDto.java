package com.ssafy.server.dto.response.challenge;

import com.ssafy.server.dto.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class ChallengeProfileModifyResponseDto extends ResponseDto {
    public ChallengeProfileModifyResponseDto(){
        super();
    }

    public static ResponseEntity<? super ChallengeProfileModifyResponseDto> success(){
        ChallengeProfileModifyResponseDto responseBody = new ChallengeProfileModifyResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
