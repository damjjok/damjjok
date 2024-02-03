package com.ssafy.server.dto.response.group;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.group.UserDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

public class GroupUserListResponseDto extends ResponseDto {

    private List<UserDto> list;

    public GroupUserListResponseDto(List<UserDto> list){
        super();
        this.list = list;
    }

    public static ResponseEntity<GroupUserListResponseDto> success(List<UserDto> list){
        GroupUserListResponseDto requestBody = new GroupUserListResponseDto(list);
        return ResponseEntity.status(HttpStatus.OK).body(requestBody);
    }

}
