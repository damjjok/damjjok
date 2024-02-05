package com.ssafy.server.dto.request.schedule;

import io.swagger.v3.oas.annotations.media.Schema;
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
    @Schema(description = "챌린지아이디")
    private Integer challengeId;
    @Schema(description = "날짜")
    private LocalDateTime date;
    @Schema(description = "담쪽이 아이디")
    private Integer damjjokId;
}
