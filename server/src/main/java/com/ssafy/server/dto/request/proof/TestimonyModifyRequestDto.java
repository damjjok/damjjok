package com.ssafy.server.dto.request.proof;


import io.swagger.v3.oas.annotations.media.Schema;
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
    @Schema(description = "증언 아이디", example = "1")
    private int testimonyId;
    @NotBlank
    @Schema(description = "제목", example = "test title")
    private String title;
    @Schema(description = "내용", example = "test content")
    private String content;
}
