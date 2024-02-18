package com.ssafy.server.dto.request.candy;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CandyCreateRequestDto {
    @NotNull
    @Schema(description = "챌린지 아이디", example = "1")
    private int challengeId;

    @NotNull
    @Schema(description = "유저 아이디", example = "1")
    private int userId;
}
