package com.ssafy.server.dto.response.group;

import com.ssafy.server.dto.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GroupResponseDto extends ResponseDto {

    public GroupResponseDto(){
        super();
    }

    public static ResponseEntity<GroupResponseDto> success(){
        GroupResponseDto responseBody = new GroupResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

}
