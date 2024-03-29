package com.ssafy.server.dto.request.proof;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TestimonyCreateRequestDto {

    @NotBlank
    @Schema(description = "제목", example = "test title")
    private String title;

    @NotBlank
    @Schema(description = "내용", example = "test content")
    private String content;

    @NotNull
    @Schema(description = "챌린지 아이디", example = "1")
    private int challengeId;

}
