package com.ssafy.server.dto.response.openvidu;

import com.ssafy.server.dto.ResponseDto;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;

@Getter
@Setter
public class OpenViduDisconnectionResponseDto extends ResponseDto {
    public OpenViduDisconnectionResponseDto(){
        super();
    }

    public static ResponseEntity<OpenViduDisconnectionResponseDto> success(){
        OpenViduDisconnectionResponseDto responseBody = new OpenViduDisconnectionResponseDto();
        return ResponseEntity.ok(responseBody);
    }
}
