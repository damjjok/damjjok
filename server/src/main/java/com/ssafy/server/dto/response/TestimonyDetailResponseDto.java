package com.ssafy.server.dto.response;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.proof.TestimonyDto;
import lombok.Getter;
import lombok.Setter;
import org.eclipse.angus.mail.iap.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class TestimonyDetailResponseDto extends ResponseDto {

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
