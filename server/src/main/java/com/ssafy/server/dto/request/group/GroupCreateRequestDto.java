package com.ssafy.server.dto.request.group;

import io.swagger.v3.oas.annotations.media.Schema;
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
    @Schema(description = "그룹명", example = "그룹명")
    private String name;

}
