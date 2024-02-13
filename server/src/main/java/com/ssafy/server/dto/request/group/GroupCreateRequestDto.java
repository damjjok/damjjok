package com.ssafy.server.dto.request.group;

import com.ssafy.server.dto.group.UserInviteDto;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupCreateRequestDto {

    @NotBlank
    @Schema(description = "그룹명", example = "그룹명")
    private String name;

    @NotNull
    @Schema(description = "userId 만 담은 리스트", example = "list 형식")
    private List<UserInviteDto> list;

}
