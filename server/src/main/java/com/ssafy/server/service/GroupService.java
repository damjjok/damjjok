package com.ssafy.server.service;


import com.ssafy.server.dto.request.group.GroupCreateRequestDto;
import com.ssafy.server.dto.response.group.GroupCreateResponseDto;
import com.ssafy.server.dto.response.group.GroupInviteResponseDto;
import com.ssafy.server.dto.response.group.GroupDetailResponseDto;
import org.springframework.http.ResponseEntity;

public interface GroupService {
    ResponseEntity<? super GroupCreateResponseDto> create(GroupCreateRequestDto dto);
    ResponseEntity<? super GroupInviteResponseDto> validateInvitationLink(String invitationLink);
    ResponseEntity<? super GroupDetailResponseDto> groupDetail(int groupId);

}
