package com.ssafy.server.dto.request.challenge;

import com.ssafy.server.dto.ResponseDto;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChallengeProfileModifyRequestDto {

    @NotBlank
    @Schema(description = "각오 한마디", example = "열심히 하겠습니당")
    private String determination;

    @NotBlank
    @Schema(description = "챌린지 이미지 경로", example = "url path")
    private String imagePath;
}
