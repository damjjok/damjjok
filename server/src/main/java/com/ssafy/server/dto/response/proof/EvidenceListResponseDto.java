package com.ssafy.server.dto.response.proof;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.proof.EvidenceDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class EvidenceListResponseDto extends ResponseDto {
    @Schema(description = "증거 리스트")
    private List<EvidenceDto> list;

    public EvidenceListResponseDto(List<EvidenceDto> list){
        super();
        this.list = list;
    }

    public static ResponseEntity<EvidenceListResponseDto> success(List<EvidenceDto> list){
        EvidenceListResponseDto responseBody = new EvidenceListResponseDto(list);
        return ResponseEntity.ok(responseBody);
    }

}
