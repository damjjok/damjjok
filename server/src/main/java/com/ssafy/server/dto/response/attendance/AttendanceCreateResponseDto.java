package com.ssafy.server.dto.response.attendance;

import com.ssafy.server.dto.ResponseDto;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;

@Getter
public class AttendanceCreateResponseDto extends ResponseDto {

    public AttendanceCreateResponseDto(){
        super();
    }

    public static ResponseEntity<AttendanceCreateResponseDto> success(){
        AttendanceCreateResponseDto responseBody = new AttendanceCreateResponseDto();
        return ResponseEntity.ok(responseBody);
    }
}
