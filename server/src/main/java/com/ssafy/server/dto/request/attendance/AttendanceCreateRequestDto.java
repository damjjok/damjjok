package com.ssafy.server.dto.request.attendance;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AttendanceCreateRequestDto {
    @NotBlank
    private int challengeId;

    @NotBlank
    private int userId;
}
