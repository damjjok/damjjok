package com.ssafy.server.dto.response.challenge;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.challenge.ChallengeDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class ChallengeDetailResponseDto extends ResponseDto {
    ChallengeDto dto;

    public ChallengeDetailResponseDto(ChallengeDto dto){
        super();
        this.dto = dto;
    }

    public static ResponseEntity<? super ChallengeDetailResponseDto> success(ChallengeDto dto){
        ChallengeDetailResponseDto responseBody = new ChallengeDetailResponseDto(dto);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
