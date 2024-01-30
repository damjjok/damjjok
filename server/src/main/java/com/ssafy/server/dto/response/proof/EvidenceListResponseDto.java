package com.ssafy.server.dto.response.proof;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.proof.EvidenceDto;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class EvidenceListResponseDto extends ResponseDto {

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
