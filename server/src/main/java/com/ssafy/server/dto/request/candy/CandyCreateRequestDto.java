package com.ssafy.server.dto.request.candy;


import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CandyCreateRequestDto {
    @NotBlank
    private int challengeId;

    @NotBlank
    private int userId;
}
