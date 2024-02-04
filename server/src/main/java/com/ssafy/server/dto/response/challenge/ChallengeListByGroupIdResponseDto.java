package com.ssafy.server.dto.response.challenge;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.challenge.ChallengeDto;
import com.ssafy.server.dto.challenge.ImageDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class ChallengeListByGroupIdResponseDto extends ResponseDto {

    List<ChallengeDto> list;

    public ChallengeListByGroupIdResponseDto(List<ChallengeDto> list){
        super();
        this.list = list;
    }

    public static ResponseEntity<? super ChallengeListByGroupIdResponseDto> success(List<ChallengeDto> list){
        ChallengeListByGroupIdResponseDto responseBody = new ChallengeListByGroupIdResponseDto(list);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
