package com.ssafy.server.dto.request.challenge;

import com.ssafy.server.dto.ResponseDto;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChallengeProfileModifyRequestDto {

    @NotBlank
    private String determination;

    @NotBlank
    private String imagePath;
}
