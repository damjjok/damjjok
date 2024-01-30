package com.ssafy.server.dto.response;


import com.ssafy.server.dto.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class CandyCreateResponseDto extends ResponseDto {

    public CandyCreateResponseDto(){
        super();
    }

    public static ResponseEntity<CandyCreateResponseDto> success(){
        CandyCreateResponseDto responseBody = new CandyCreateResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
