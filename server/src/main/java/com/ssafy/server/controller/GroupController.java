package com.ssafy.server.controller;

import com.ssafy.server.dto.request.group.GroupRequestDto;
import com.ssafy.server.dto.response.group.GroupResponseDto;
import com.ssafy.server.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/group")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @PostMapping("/create")
    public ResponseEntity<? super GroupResponseDto> createGroup(@RequestBody GroupRequestDto requestBody){
        ResponseEntity<? super GroupResponseDto> response = groupService.create(requestBody);
        return response;
    }

}
