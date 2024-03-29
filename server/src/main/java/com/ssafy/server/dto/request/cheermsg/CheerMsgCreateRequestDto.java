package com.ssafy.server.dto.request.cheermsg;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheerMsgCreateRequestDto {
    @NotNull
    @Schema(description = "챌린지 아이디", example = "1")
    private int challengeId;

    @NotBlank
    @Schema(description = "응원 메시지 내용", example = "Test Msg.")
    private String content;
}
