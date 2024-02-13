package com.ssafy.server.dto.request.attendance;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttedanceListRquestDto {
    @NotNull
    @Schema(description = "챌린지 아이디", example = "1")
    private int challengeId;
}
