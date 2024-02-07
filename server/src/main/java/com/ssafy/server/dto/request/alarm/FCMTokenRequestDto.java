package com.ssafy.server.dto.request.alarm;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FCMTokenRequestDto {
    @NotBlank
    @Schema(description = "fcmToken", example = "발급받은 토큰 값")
    private String fcmToken;
}
