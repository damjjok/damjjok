package com.ssafy.server.dto.request.notification;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationCheckReadRequestDto {
    @NotBlank
    @Schema(description = "알림 Id", example = "1")
    private int notificationId;
}
