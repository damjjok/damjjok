package com.ssafy.server.dto.request.group;

import com.ssafy.server.dto.group.UserInviteDto;
import jakarta.validation.constraints.NotBlank;
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
    @NotBlank
    private int groupId;

    @NotBlank
    private List<UserInviteDto> list;
}
