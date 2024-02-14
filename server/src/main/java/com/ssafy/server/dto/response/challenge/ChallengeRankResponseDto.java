package com.ssafy.server.dto.response.challenge;

import com.ssafy.server.dto.ResponseDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class ChallengeRankResponseDto extends ResponseDto {

    @Schema(description = "해당 챌린지 등 수", example = "1")
    private int rank;

    @Schema(description = "전체 챌린지 수 (중복 제외)", example = "5")
    private int total;

    public ChallengeRankResponseDto(int rank, int total){
        super();
        this.rank = rank;
        this.total = total;
    }

    public static ResponseEntity<? super ChallengeRankResponseDto> success(int rank, int total){
        ChallengeRankResponseDto responseBody = new ChallengeRankResponseDto(rank,total);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
