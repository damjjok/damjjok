package com.ssafy.server.dto.response.notification;

import com.ssafy.server.dto.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class NotificationCreateResponseDto extends ResponseDto {
    public NotificationCreateResponseDto() { super();}
    public static ResponseEntity<NotificationCreateResponseDto> success() {
        NotificationCreateResponseDto responseBody = new NotificationCreateResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

}
