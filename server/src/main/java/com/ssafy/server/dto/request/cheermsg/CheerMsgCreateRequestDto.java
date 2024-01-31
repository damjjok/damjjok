package com.ssafy.server.dto.request.cheermsg;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheerMsgCreateRequestDto {
    @NotBlank
    private int challengeId;
    @NotBlank
    private int userId;
    @NotBlank
    private String content;
}
