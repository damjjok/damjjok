package com.ssafy.server.dto.response.test;

import com.ssafy.server.dto.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class AlarmResponseDto extends ResponseDto {

    private String messageId;

    public AlarmResponseDto(String messageId){
        super();
        this.messageId = messageId;
    }

    public static ResponseEntity<? super AlarmResponseDto> success(String messageId){
        AlarmResponseDto responseBody = new AlarmResponseDto(messageId);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

}
