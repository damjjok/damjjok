package com.ssafy.server.dto.response.auth;

import com.ssafy.server.dto.ResponseDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class TokenResponseDto {

    @Schema(description = "accessToken")
    private String accessToken;

    @Schema(description = "refreshToken")
    private String refreshToken;

    private TokenResponseDto(){
        super();
    }

    private TokenResponseDto(String accessToken, String refreshToken){
        super();
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    public static ResponseEntity<TokenResponseDto> success(String accessToken, String refreshToken){
        TokenResponseDto responseBody = new TokenResponseDto(accessToken,refreshToken);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<TokenResponseDto> expiredAndNotExistToken(){
        TokenResponseDto responseBody = new TokenResponseDto();
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(responseBody);
    }

}
