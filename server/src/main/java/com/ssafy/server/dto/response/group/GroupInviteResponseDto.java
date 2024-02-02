package com.ssafy.server.dto.response.group;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.entity.GroupEntity;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GroupInviteResponseDto extends ResponseDto {

    private Integer groupId;

    public GroupInviteResponseDto(){
        super();
    }

    public GroupInviteResponseDto(Integer groupId) {
        super();
        this.groupId = groupId;
    }

    public static ResponseEntity<GroupInviteResponseDto> success(){
        GroupInviteResponseDto responseBody = new GroupInviteResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<GroupInviteResponseDto> sendGroupInfo(Integer groupId){
        GroupInviteResponseDto responseBody = new GroupInviteResponseDto(groupId);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

}
