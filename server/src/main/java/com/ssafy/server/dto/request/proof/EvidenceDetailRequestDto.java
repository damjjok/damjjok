package com.ssafy.server.dto.request.proof;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class EvidenceDetailRequestDto {

    @NotNull
    @Schema(description = "증거 아이디", example = "1")
    private int evidenceId;
}
