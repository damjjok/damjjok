package com.ssafy.server.dto.response.challenge;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.challenge.ImageDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class ChallengeProfileImageResponseDto extends ResponseDto {

    List<ImageDto> list;

    public ChallengeProfileImageResponseDto(List<ImageDto> list){
        super();
        this.list = list;
    }

    public static ResponseEntity<? super ChallengeProfileImageResponseDto> success(List<ImageDto> list){
        ChallengeProfileImageResponseDto responseBody = new ChallengeProfileImageResponseDto(list);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
