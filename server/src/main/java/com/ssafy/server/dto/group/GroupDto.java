package com.ssafy.server.dto.group;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class GroupDto {
    private Integer groupId;
    private String groupname;
    private LocalDateTime createAt;
    private LocalDateTime endDate;
    private String createdBy;
    private String invitationLink;
}
