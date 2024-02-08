package com.ssafy.server.dto.request.notification;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.checkerframework.checker.units.qual.N;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationCreateRequestDto {
    @NotBlank
    @Schema(description = "수신인", example = "1")
    private int receiving_member_id;

    @NotBlank
    @Schema(description = "들어갈 링크", example = "https://...")
    private String link;
}
