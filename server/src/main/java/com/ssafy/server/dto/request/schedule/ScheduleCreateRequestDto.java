package com.ssafy.server.dto.request.schedule;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
//생성자는 담쪽이
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleCreateRequestDto {
    private Integer challengeId;
    private LocalDateTime date;
    private Integer damjjokId;
}
