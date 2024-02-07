package com.ssafy.server.controller;

import com.ssafy.server.dto.request.group.GroupCreateRequestDto;
import com.ssafy.server.dto.request.group.GroupMemberCreateRequestDto;
import com.ssafy.server.dto.response.challenge.ChallengeProfileModifyResponseDto;
import com.ssafy.server.dto.response.group.*;
import com.ssafy.server.provider.JwtProvider;
import com.ssafy.server.service.GroupService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/group")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;
    private final JwtProvider jwtProvider;

    @PostMapping("/create")
    @Operation(summary = "그룹 생성", description = "그룹을 생성",
            responses = { @ApiResponse(responseCode = "200", description = "그룹 성공",
                    content = @Content(schema = @Schema(implementation = GroupCreateResponseDto.class)))})
    public ResponseEntity<? super GroupCreateResponseDto> createGroup(@RequestBody GroupCreateRequestDto requestBody){
        ResponseEntity<? super GroupCreateResponseDto> response = groupService.create(requestBody);
        return response;
}

    @GetMapping("/invite/validate")
    @Operation(summary = "초대코드 검증", description = "초대코드 유효성을 검증",
            responses = { @ApiResponse(responseCode = "200", description = "초대코드 유효성 검증 성공",
                    content = @Content(schema = @Schema(implementation = GroupInviteResponseDto.class)))})
    public ResponseEntity<? super GroupInviteResponseDto> validateInvitation(@RequestParam String invitationLink){
        ResponseEntity<? super GroupInviteResponseDto> response = groupService.validateInvitationLink(invitationLink);
        return response;
    }

    @GetMapping("/detail/{groupId}")
    @Operation(summary = "특정 그룹의 디테일 정보", description = "특정 그룹의 디테일 정보",
            responses = { @ApiResponse(responseCode = "200", description = "그룹 디테일 정보 반환 성공",
                    content = @Content(schema = @Schema(implementation = GroupDetailResponseDto.class)))})
    public ResponseEntity<? super GroupDetailResponseDto> groupDetail(@PathVariable int groupId) {
        ResponseEntity<? super GroupDetailResponseDto> response = groupService.groupDetail(groupId);
        return response;
    }

    @GetMapping("/search-user/{email}")
    @Operation(summary = "이메일 기반 유저검색", description = "그룹 초대할때 유저 검색으로 쓰임",
            responses = { @ApiResponse(responseCode = "200", description = "유저들 반환 성공",
                    content = @Content(schema = @Schema(implementation = GroupUserListResponseDto.class)))})
    public ResponseEntity<? super GroupUserListResponseDto> userList(@PathVariable String email){
        ResponseEntity<? super GroupUserListResponseDto> response = groupService.userList(email);
        return response;
    }

    @PostMapping("/{groupId}/join")
    @Operation(summary = "특정 그룹 가입", description = "특정 그룹 가입(초대된 사람들 한번에 가입 시킴)",
            responses = { @ApiResponse(responseCode = "200", description = "특정 그룹 가입 성공",
                    content = @Content(schema = @Schema(implementation = GroupMemberCreateResponseDto.class)))})
    public ResponseEntity<? super GroupMemberCreateResponseDto> joinGroup(
            @PathVariable int groupId,
            @RequestBody  GroupMemberCreateRequestDto dto) {
        dto.setGroupId(groupId);
        ResponseEntity<? super GroupMemberCreateResponseDto> response = groupService.joinGroupMember(dto);
        return response;
    }

    @GetMapping("/user/group-list")
    @Operation(summary = "특정 유저의 참여 그룹들 반환", description = "특정 유저의 참여 그룹들 반환",
            responses = { @ApiResponse(responseCode = "200", description = "특정 유저의 참여 그룹들 반환 성공",
                    content = @Content(schema = @Schema(implementation = GroupListByUserResponseDto.class)))})
    public ResponseEntity<? super GroupListByUserResponseDto> groupListByUser
            (){
        ResponseEntity<? super GroupListByUserResponseDto> response = groupService.groupListByUser();
        return response;
    }

    @GetMapping("/{groupId}/user-list")
    @Operation(summary = "특정 그룹의 참여 유저들 반환", description = "특정 그룹의 참여 유저들 반환",
            responses = { @ApiResponse(responseCode = "200", description = "특정 그룹의 참여 유저들 반환 성공",
                    content = @Content(schema = @Schema(implementation = GroupUserListResponseDto.class)))})
    public ResponseEntity<? super GroupUserListResponseDto> userListByGroup(@PathVariable int groupId){
        ResponseEntity<? super GroupUserListResponseDto> response = groupService.userListByGroup(groupId);
        return response;
    }
}
