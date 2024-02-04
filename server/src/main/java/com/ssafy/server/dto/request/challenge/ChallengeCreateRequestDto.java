package com.ssafy.server.dto.request.challenge;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChallengeCreateRequestDto {
    @NotBlank
    private int groupId;

    @NotBlank
    private int userId;

    @NotBlank
    private int initialMoney;

    @NotBlank
    private int savedMoney;

    @NotBlank
    private Integer savedPeriod;

}
