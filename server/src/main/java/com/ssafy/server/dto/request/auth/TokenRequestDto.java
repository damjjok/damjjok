package com.ssafy.server.dto.request.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TokenRequestDto {

    @NotBlank
    private String accessToken;

    @NotBlank
    private String refreshToken;

}
