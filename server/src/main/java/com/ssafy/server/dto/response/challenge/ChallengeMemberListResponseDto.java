package com.ssafy.server.dto.response.challenge;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.challenge.ChallengeDto;
import com.ssafy.server.dto.challenge.ChallengeMemeberDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class ChallengeMemberListResponseDto extends ResponseDto {

    List<ChallengeMemeberDto> list;

    public ChallengeMemberListResponseDto(List<ChallengeMemeberDto> list){
        super();
        this.list = list;
    }

    public static ResponseEntity<? super ChallengeMemberListResponseDto> success(List<ChallengeMemeberDto> list){
        ChallengeMemberListResponseDto responseBody = new ChallengeMemberListResponseDto(list);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
