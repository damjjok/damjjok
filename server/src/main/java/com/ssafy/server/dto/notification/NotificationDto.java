package com.ssafy.server.dto.notification;

import com.ssafy.server.entity.CommonCodeEntity;
import com.ssafy.server.entity.UserEntity;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NotificationDto {
    private Integer notificationId;
    private Integer userId;
    private Integer commonCodeId;
    private String notificationContents;
    private String link;
    private Boolean readOrNot;
    private LocalDateTime sendDate;
    private String notification_message_content;
    private String notification_message_title;
}
