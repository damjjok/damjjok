package com.ssafy.server.dto.request;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TestimonyModifyRequestDto {

    @NotBlank
    private int testimonyId;
    @NotBlank
    private String title;
    private String content;
}
