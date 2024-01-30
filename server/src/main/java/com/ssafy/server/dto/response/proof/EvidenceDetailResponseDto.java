package com.ssafy.server.dto.response.proof;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.proof.EvidenceDto;
import lombok.Getter;
import org.springframework.http.ResponseEntity;


@Getter
public class EvidenceDetailResponseDto extends ResponseDto {

    private EvidenceDto evidence;

    public EvidenceDetailResponseDto(EvidenceDto evidence){
        super();
        this.evidence = evidence;
    }

    public static ResponseEntity<EvidenceDetailResponseDto> success(EvidenceDto evidence){
        EvidenceDetailResponseDto response = new EvidenceDetailResponseDto(evidence);
        return ResponseEntity.ok(response);
    }

}
