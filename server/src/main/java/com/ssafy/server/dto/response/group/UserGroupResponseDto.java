package com.ssafy.server.dto.response.group;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.group.GroupDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

@Getter
public class UserGroupResponseDto extends ResponseDto {

    private List<GroupDto> groupList;

    public UserGroupResponseDto(List<GroupDto> groupList){
        super();
        this.groupList = groupList;
    }

    public static ResponseEntity<UserGroupResponseDto> success(List<GroupDto> groupList){
        UserGroupResponseDto responseBody = new UserGroupResponseDto(groupList);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

}
