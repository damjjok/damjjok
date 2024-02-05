package com.ssafy.server.dto.response;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.schedule.ScheduleDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class ScheduleDetailResponseDto extends ResponseDto {

    private ScheduleDto schedule;
    public ScheduleDetailResponseDto(ScheduleDto schedule) {
        super();
        this.schedule = schedule;
    }

    @Schema(description = "성공")
    public static ResponseEntity<ScheduleDetailResponseDto> success(ScheduleDto schedule) {
        ScheduleDetailResponseDto responseBody = new ScheduleDetailResponseDto(schedule);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
