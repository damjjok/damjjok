package com.ssafy.server.dto.request.challenge;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChallengeChangeStatusRequestDto {
    @NotBlank
    @Schema(description = "챌린지 아이디", example = "1")
    private int challengeId;

    @NotBlank
    @Schema(description = "챌린지 상태", example = "Completed")
    private String status;

}
