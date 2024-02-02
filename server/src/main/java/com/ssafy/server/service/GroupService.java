package com.ssafy.server.service;


import com.ssafy.server.dto.request.group.GroupRequestDto;
import com.ssafy.server.dto.response.group.GroupResponseDto;
import org.springframework.http.ResponseEntity;

public interface GroupService {
    ResponseEntity<? super GroupResponseDto> create(GroupRequestDto dto);

}
