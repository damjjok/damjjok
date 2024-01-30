package com.ssafy.server.dto.response.candy;

import com.ssafy.server.dto.ResponseDto;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;

@Getter
@Setter
public class CandyCountResponseDto extends ResponseDto {

    private int count;

    public CandyCountResponseDto(int count){
        super();
        this.count = count;
    }

    public static ResponseEntity<CandyCountResponseDto> success(int count){
        CandyCountResponseDto responseBody = new CandyCountResponseDto(count);
        return ResponseEntity.ok(responseBody);
    }
}
