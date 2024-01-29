package com.ssafy.server.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
//생성자는 담쪽이
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateScheduleRequestDto {
    private Integer challengeId;
    private LocalDateTime date;
}
