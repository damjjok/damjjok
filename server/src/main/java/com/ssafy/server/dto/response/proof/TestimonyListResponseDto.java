package com.ssafy.server.dto.response.proof;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.proof.TestimonyDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class TestimonyListResponseDto extends ResponseDto {

    @Schema(description = "증언 리스트")
    private List<TestimonyDto> list;
    public TestimonyListResponseDto(List<TestimonyDto> list){
        super();
        this.list = list;
    }

    public static ResponseEntity<TestimonyListResponseDto> success(List<TestimonyDto> list){
        TestimonyListResponseDto responseBody = new TestimonyListResponseDto(list);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}



