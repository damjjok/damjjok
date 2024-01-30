package com.ssafy.server.dto.response.proof;

import com.ssafy.server.dto.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class EvidenceCreateResponseDto extends ResponseDto {

    public EvidenceCreateResponseDto(){
        super();
    }

    public static ResponseEntity<EvidenceCreateResponseDto> success(){
        EvidenceCreateResponseDto responseBody = new EvidenceCreateResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }


}
