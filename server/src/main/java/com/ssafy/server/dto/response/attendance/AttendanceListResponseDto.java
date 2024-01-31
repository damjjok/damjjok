package com.ssafy.server.dto.response.attendance;

import com.ssafy.server.dto.ResponseDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
public class AttendanceListResponseDto extends ResponseDto {

    @Schema(description = "사탕 개수")
    private List<LocalDateTime> list;

    public AttendanceListResponseDto(List<LocalDateTime> list){
        super();
        this.list = list;
    }

    public static ResponseEntity<AttendanceListResponseDto> success(List<LocalDateTime> list){
        AttendanceListResponseDto responseBody = new AttendanceListResponseDto(list);
        return ResponseEntity.ok(responseBody);
    }
}
