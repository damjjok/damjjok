package com.ssafy.server.dto.response.proof;

import com.ssafy.server.dto.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class TestimonyModifyResponseDto extends ResponseDto{

    public TestimonyModifyResponseDto(){
        super();
    }

    public static ResponseEntity<TestimonyModifyResponseDto> success(){
        TestimonyModifyResponseDto responseBody = new TestimonyModifyResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
