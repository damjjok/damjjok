package com.ssafy.server.dto.response.auth;

import com.ssafy.server.dto.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class FcmTokenResponseDto extends ResponseDto {

    public FcmTokenResponseDto(){
        super();
    }

    public static ResponseEntity<? super FcmTokenResponseDto> success(){
        FcmTokenResponseDto response = new FcmTokenResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
