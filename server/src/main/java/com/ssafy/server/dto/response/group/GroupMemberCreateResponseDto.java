package com.ssafy.server.dto.response.group;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.request.group.GroupMemberCreateRequestDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GroupMemberCreateResponseDto extends ResponseDto {

    public GroupMemberCreateResponseDto(){
        super();
    }

    public static ResponseEntity<? super GroupMemberCreateResponseDto> success(){
        ResponseDto responseBody = new ResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

}
