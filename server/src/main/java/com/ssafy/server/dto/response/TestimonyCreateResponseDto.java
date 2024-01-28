package com.ssafy.server.dto.response;


import com.ssafy.server.dto.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class TestimonyCreateResponseDto extends ResponseDto {

    public TestimonyCreateResponseDto(){
        super();
    }

    public static ResponseEntity<TestimonyCreateResponseDto> success(){
        TestimonyCreateResponseDto responseBody = new TestimonyCreateResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

}
