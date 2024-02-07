package com.ssafy.server.dto.notification;

import com.ssafy.server.entity.CommonCodeEntity;
import com.ssafy.server.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDto {
    private Integer notificationId;
    private Integer userId;
    private Integer commonCodeId;
    private String notificationContents;
    private String link;
    private Boolean readOrNot;
    private LocalDateTime sendDate;
}
