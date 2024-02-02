package com.ssafy.server.dto.response.group;

import com.ssafy.server.dto.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GroupCreateResponseDto extends ResponseDto {


    public GroupCreateResponseDto(){
        super();
    }

    public static ResponseEntity<GroupCreateResponseDto> success(){
        GroupCreateResponseDto responseBody = new GroupCreateResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

}
