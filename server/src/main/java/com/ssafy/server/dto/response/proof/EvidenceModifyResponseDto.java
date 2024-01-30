package com.ssafy.server.dto.response.proof;


import com.ssafy.server.dto.ResponseDto;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

@Getter
public class EvidenceModifyResponseDto extends ResponseDto {

    public EvidenceModifyResponseDto(){
        super();
    }

    public static ResponseEntity<EvidenceModifyResponseDto> success(){
        EvidenceModifyResponseDto responseBody = new EvidenceModifyResponseDto();
        return ResponseEntity.ok(responseBody);
    }
}
