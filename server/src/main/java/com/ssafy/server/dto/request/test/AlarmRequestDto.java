package com.ssafy.server.dto.request.test;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AlarmRequestDto {
    @NotBlank
    private String token;
    @NotBlank
    private String title;
    @NotBlank
    private String body;
}
