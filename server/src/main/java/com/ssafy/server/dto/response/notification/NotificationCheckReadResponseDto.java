package com.ssafy.server.dto.response.notification;

import com.ssafy.server.dto.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class NotificationCheckReadResponseDto extends ResponseDto {

    public NotificationCheckReadResponseDto() {super();}

    public static ResponseEntity<NotificationCheckReadResponseDto> success() {
        NotificationCheckReadResponseDto responseBody = new NotificationCheckReadResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
