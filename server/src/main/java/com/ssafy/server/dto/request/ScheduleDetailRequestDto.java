package com.ssafy.server.dto.request;

import jakarta.validation.constraints.NotBlank;

public class ScheduleDetailRequestDto {
    @NotBlank
    private int challengeId;
}
