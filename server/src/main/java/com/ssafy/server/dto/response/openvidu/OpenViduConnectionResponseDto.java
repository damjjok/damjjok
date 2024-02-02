package com.ssafy.server.dto.response.openvidu;


import com.ssafy.server.dto.ResponseDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;

@Getter
@Setter
public class OpenViduConnectionResponseDto extends ResponseDto {
    @Schema
    private String token;

    public OpenViduConnectionResponseDto(String token){
        this.token = token;
    }

    public static ResponseEntity<OpenViduConnectionResponseDto> success(String token){
        OpenViduConnectionResponseDto responseBody = new OpenViduConnectionResponseDto(token);
        return ResponseEntity.ok(responseBody);
    }


}
