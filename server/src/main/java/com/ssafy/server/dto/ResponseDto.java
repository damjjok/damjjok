package com.ssafy.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@AllArgsConstructor
public class ResponseDto {

    private String code;
    private String message;

    public ResponseDto(){
        this.code = "tmp";
        this.message = "tmp message";
    }

    public static ResponseEntity<ResponseDto> databaseError(){
        ResponseDto responseBody = new ResponseDto();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }
    public static ResponseEntity<ResponseDto> validationFail(){
        ResponseDto responseBody = new ResponseDto();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
}