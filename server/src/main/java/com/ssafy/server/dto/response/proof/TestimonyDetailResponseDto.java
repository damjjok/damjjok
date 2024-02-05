package com.ssafy.server.dto.response.proof;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.proof.TestimonyDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class TestimonyDetailResponseDto extends ResponseDto {

    @Schema(description = "증언")
    private TestimonyDto testimony;
    public TestimonyDetailResponseDto(TestimonyDto testimony){
        super();
        this.testimony = testimony;
    }

    public static ResponseEntity<TestimonyDetailResponseDto> success(TestimonyDto testimony){
        TestimonyDetailResponseDto responseBody = new TestimonyDetailResponseDto(testimony);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
