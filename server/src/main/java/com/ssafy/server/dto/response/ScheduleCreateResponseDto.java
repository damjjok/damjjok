package com.ssafy.server.dto.response;

import com.ssafy.server.dto.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class ScheduleCreateResponseDto extends ResponseDto {
    public ScheduleCreateResponseDto() {super();}
    public static ResponseEntity<ScheduleCreateResponseDto> success() {
        ScheduleCreateResponseDto responseBody = new ScheduleCreateResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ScheduleCreateResponseDto> wrongDate() {
        ScheduleCreateResponseDto responseBody = new ScheduleCreateResponseDto();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

}
