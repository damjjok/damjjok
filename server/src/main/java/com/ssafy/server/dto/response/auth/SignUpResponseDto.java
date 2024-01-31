package com.ssafy.server.dto.response.auth;

import com.ssafy.server.common.ResponseCode;
import com.ssafy.server.common.ResponseMessage;
import com.ssafy.server.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


public class SignUpResponseDto extends ResponseDto{

    private String accessToken;

    private SignUpResponseDto(String accessToken)  {
        super();
        this.accessToken = accessToken;
    }

    public static ResponseEntity<SignUpResponseDto> success(String accessToken){
        SignUpResponseDto responseBody = new SignUpResponseDto(accessToken);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> duplicateEmail(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.DUPLICATE_EMAIL, ResponseMessage.DUPLICATE_EMAIL);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

}
