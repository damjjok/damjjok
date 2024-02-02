package com.ssafy.server.dto.request.group;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupCreateRequestDto {

    @NotBlank
    private String title;

    @NotBlank
    private String created_by;

}
