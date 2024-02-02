package com.ssafy.server.dto.response.group;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.group.GroupDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

@Getter
public class GroupDetailResponseDto extends ResponseDto {

    private GroupDto groupDto;

    public GroupDetailResponseDto(GroupDto groupDto){
        super();
        this.groupDto = groupDto;
    }

    public static ResponseEntity<GroupDetailResponseDto> success(GroupDto groupDto){
        GroupDetailResponseDto responseBody = new GroupDetailResponseDto(groupDto);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

}
