package com.ssafy.server.service;


import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.request.group.GroupCreateRequestDto;
import com.ssafy.server.dto.request.group.GroupMemberCreateRequestDto;
import com.ssafy.server.dto.response.group.*;
import org.springframework.http.ResponseEntity;

public interface GroupService {
    ResponseEntity<? super GroupCreateResponseDto> create(GroupCreateRequestDto dto);
    ResponseEntity<? super GroupInviteResponseDto> validateInvitationLink(String invitationLink);
    ResponseEntity<? super GroupDetailResponseDto> groupDetail(int groupId);
    ResponseEntity<? super GroupUserListResponseDto> userList(String email);
    ResponseEntity<? super GroupMemberCreateResponseDto> joinGroupMember(GroupMemberCreateRequestDto dto);
    ResponseEntity<? super GroupListByUserResponseDto> groupListByUser();
    ResponseEntity<? super GroupUserListResponseDto> userListByGroup(int groupId);
}
