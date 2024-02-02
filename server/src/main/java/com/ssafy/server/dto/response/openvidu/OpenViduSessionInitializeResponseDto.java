package com.ssafy.server.dto.response.openvidu;


import com.ssafy.server.dto.ResponseDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;

@Getter
@Setter
public class OpenViduSessionInitializeResponseDto extends ResponseDto {
    @Schema
    private String sessionId;

    public OpenViduSessionInitializeResponseDto(String sessionId){
        this.sessionId = sessionId;
    }

    public static ResponseEntity<OpenViduSessionInitializeResponseDto> success(String sessionId){
        OpenViduSessionInitializeResponseDto responseBody = new OpenViduSessionInitializeResponseDto(sessionId);
        return ResponseEntity.ok(responseBody);
    }


}
