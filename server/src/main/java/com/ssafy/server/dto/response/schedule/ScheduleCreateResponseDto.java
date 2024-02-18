package com.ssafy.server.dto.response.schedule;

import com.ssafy.server.dto.ResponseDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class ScheduleCreateResponseDto extends ResponseDto {
    public ScheduleCreateResponseDto() {super();}

    @Schema(description = "성공 : SU")
    public static ResponseEntity<ScheduleCreateResponseDto> success() {
        ScheduleCreateResponseDto responseBody = new ScheduleCreateResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    @Schema(description = "실패 : 챌린지 종료일 3일 이전보다 후")
    public static ResponseEntity<ScheduleCreateResponseDto> wrongDate() {
        ScheduleCreateResponseDto responseBody = new ScheduleCreateResponseDto();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    @Schema(description = "실패 : 담쪽이가 아닌 사람이 일정 생성")
    public static ResponseEntity<ScheduleCreateResponseDto> notDomjjok() {
        ScheduleCreateResponseDto responseBody = new ScheduleCreateResponseDto();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }

    @Schema(description = "실패 : 마지막 진실의 방 이후로 증언이나 증거가 1개도 없음")
    public static ResponseEntity<ScheduleCreateResponseDto> noProof() {
        ScheduleCreateResponseDto responseBody = new ScheduleCreateResponseDto();
        responseBody.setMessage("마지막 진실의 방 이후 증언이나 증거가 없습니다.");
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(responseBody);
    }
}
