package com.ssafy.server.dto.request.schedule;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleDetailRequestDto {
    @Schema(description = "챌린지 아이디")
    @NotBlank
    private int challengeId;
}
