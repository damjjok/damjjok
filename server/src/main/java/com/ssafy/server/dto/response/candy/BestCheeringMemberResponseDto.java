package com.ssafy.server.dto.response.candy;

import com.ssafy.server.dto.ResponseDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;

@Getter
@Setter
public class BestCheeringMemberResponseDto extends ResponseDto {
    @Schema(description = "유저 이름", example = "김다희")
    private String userName;
    @Schema(description = "응원왕의 캔디 수", example = "16")
    private int candyCnt;
    @Schema(description = "응원왕의 메시지 수", example = "3")
    private int cheerMsgCnt;

    public BestCheeringMemberResponseDto(String userName, int candyCnt, int cheerMsgCnt){
        super();
        this.userName = userName;
        this.candyCnt = candyCnt;
        this.cheerMsgCnt = cheerMsgCnt;
    }
    public static ResponseEntity<? super BestCheeringMemberResponseDto> success(String userName, int candyCnt, int cheerMsgCnt){
        BestCheeringMemberResponseDto responseBody = new BestCheeringMemberResponseDto(userName, candyCnt, cheerMsgCnt);
        return ResponseEntity.ok(responseBody);
    }

}
