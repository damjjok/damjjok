package com.ssafy.server.dto.request.challenge;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ChallengeRankRequestDto {
    @NotBlank
    @Schema(description = "챌린지 아이디", example = "1")
    private int challengeId;
}
