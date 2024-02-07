package com.ssafy.server.dto.response.challenge;

import com.ssafy.server.dto.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class ChallengeRankResponseDto extends ResponseDto {

    private int rank;

    public ChallengeRankResponseDto(int rank){
        super();
        this.rank = rank;
    }

    public static ResponseEntity<? super ChallengeRankResponseDto> success(int rank){
        ChallengeRankResponseDto responseBody = new ChallengeRankResponseDto(rank);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
