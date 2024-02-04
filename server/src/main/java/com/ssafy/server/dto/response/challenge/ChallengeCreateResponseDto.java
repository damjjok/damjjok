package com.ssafy.server.dto.response.challenge;

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

}
