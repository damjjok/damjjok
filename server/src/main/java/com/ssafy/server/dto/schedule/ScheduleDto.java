package com.ssafy.server.dto.schedule;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleDto {
    private Integer scheduleId;
    @NotBlank
    private Integer challengeId;
    @NotBlank
    private LocalDateTime date;
    @NotBlank
    private Boolean endDate;
    private Integer createdBy;
    private LocalDateTime createdAt;
}
