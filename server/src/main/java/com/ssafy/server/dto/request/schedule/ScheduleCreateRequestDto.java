package com.ssafy.server.dto.request.schedule;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
//생성자는 담쪽이
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleCreateRequestDto {
    @NotNull
    @Schema(description = "챌린지아이디")
    private Integer challengeId;

    @NotBlank
    @Schema(description = "날짜")
    private LocalDateTime date;

}
