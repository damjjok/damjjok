package com.ssafy.server.dto.schedule;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleDto {
    private Integer scheduleId;
    private Integer challengeId;
    private LocalDateTime date;
    private Boolean endDate;
    private Integer createdBy;
    private LocalDateTime createdAt;
}
