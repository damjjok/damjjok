package com.ssafy.server.controller;

import com.ssafy.server.dto.request.group.GroupCreateRequestDto;
import com.ssafy.server.dto.response.group.GroupCreateResponseDto;
import com.ssafy.server.dto.response.group.GroupDetailResponseDto;
import com.ssafy.server.dto.response.group.GroupInviteResponseDto;
import com.ssafy.server.dto.response.group.GroupUserListResponseDto;
import com.ssafy.server.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/group")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @PostMapping("/create")
    public ResponseEntity<? super GroupCreateResponseDto> createGroup(@RequestBody GroupCreateRequestDto requestBody){
        ResponseEntity<? super GroupCreateResponseDto> response = groupService.create(requestBody);
        return response;
}

    @GetMapping("/invite/validate")
    public ResponseEntity<? super GroupInviteResponseDto> validateInvitation(@RequestParam String invitationLink){
        ResponseEntity<? super GroupInviteResponseDto> response = groupService.validateInvitationLink(invitationLink);
        return response;
    }

    @GetMapping("/detail/{groupId}")
    public ResponseEntity<? super GroupDetailResponseDto> groupDetail(@PathVariable int groupId) {
        ResponseEntity<? super GroupDetailResponseDto> response = groupService.groupDetail(groupId);
        return response;
    }

    @GetMapping("/search-user/{email}")
    public ResponseEntity<? super GroupUserListResponseDto> userList(@PathVariable String email){
        ResponseEntity<? super GroupUserListResponseDto> response = groupService.userList(email);
        return response;
    }
}
