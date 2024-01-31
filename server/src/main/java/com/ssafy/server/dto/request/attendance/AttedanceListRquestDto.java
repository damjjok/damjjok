package com.ssafy.server.dto.request.attendance;


import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttedanceListRquestDto {
    @NotBlank
    private int challengeId;
}
