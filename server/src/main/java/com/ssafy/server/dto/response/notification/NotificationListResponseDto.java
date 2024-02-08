package com.ssafy.server.dto.response.notification;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.notification.NotificationDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class NotificationListResponseDto extends ResponseDto {

    @Schema(description = "알림 리스트")
    private List<NotificationDto> list;

    public NotificationListResponseDto(List<NotificationDto> list) {
        super();
        this.list = list;
    }

    public static ResponseEntity<NotificationListResponseDto> success(List<NotificationDto> list){
        NotificationListResponseDto responseBody = new NotificationListResponseDto(list);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
