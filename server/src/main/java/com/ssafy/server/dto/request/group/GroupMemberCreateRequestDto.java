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

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GroupMemberCreateRequestDto {
    @NotNull
    @Schema(description = "그룹 아이디", example = "1")
    private int groupId;

    @NotNull
    @Schema(description = "userId 만 담은 리스트", example = "list 형식")
    private List<UserInviteDto> list;
}
