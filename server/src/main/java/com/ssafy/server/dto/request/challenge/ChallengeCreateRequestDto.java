package com.ssafy.server.dto.request.challenge;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChallengeCreateRequestDto {
    @NotNull
    @Schema(description = "그룹 아이디", example = "1")
    private int groupId;

    @NotNull
    @Schema(description = "챌린지 기간", example = "30,60,90,120,150,180")
    private int duration;

    @NotNull
    @Schema(description = "기본금", example = "1000")
    private int initialMoney;

    @NotNull
    @Schema(description = "적립 금액", example = "1000")
    private int savedMoney;

    @NotNull
    @Schema(description = "적립금 주기", example = "30")
    private int savedPeriod;

}
