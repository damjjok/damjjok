package com.ssafy.server.dto.request.proof;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class EvidenceDetailRequestDto {

    @NotBlank
    private int evidenceId;
}
