package com.ssafy.server.dto.request.openvidu;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OpenViduSessionInitializeRequestDto {

    @NotBlank
    @Schema(description = "세션 키", example = "session-key")
    private String sessionKey;


}
