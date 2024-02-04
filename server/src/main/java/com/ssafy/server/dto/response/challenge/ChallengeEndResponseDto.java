package com.ssafy.server.dto.response.challenge;

import com.ssafy.server.dto.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class ChallengeEndResponseDto extends ResponseDto {

    public ChallengeEndResponseDto(){
        super();
    }

    public static ResponseEntity<? super ChallengeEndResponseDto> success(){
        ChallengeEndResponseDto responseBody = new ChallengeEndResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
