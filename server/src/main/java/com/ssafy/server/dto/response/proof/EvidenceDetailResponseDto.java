package com.ssafy.server.dto.response.proof;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.proof.EvidenceDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import org.springframework.http.ResponseEntity;


@Getter
public class EvidenceDetailResponseDto extends ResponseDto {
    @Schema(description = "증거")
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
