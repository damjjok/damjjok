package com.ssafy.server.dto.response.group;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.group.GroupDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GroupListByUserResponseDto extends ResponseDto {

    private List<GroupDto> list;

    public GroupListByUserResponseDto(List<GroupDto> list){
        super();
        this.list = list;
    }

    static public ResponseEntity<? super GroupListByUserResponseDto> success(List<GroupDto> list){
        GroupListByUserResponseDto responseBody = new GroupListByUserResponseDto(list);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

}
