package com.ssafy.server.dto.response.challenge;

import com.ssafy.server.dto.ResponseDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class ChallengeSavedMoneyResponseDto extends ResponseDto {

    @Schema(description = "현재 누적 금액", example = "김다희")
    private int savedMoney;
    @Schema(description = "챌린지 만료시 예상 금액", example = "김다희")
    private int endMoney;

    public ChallengeSavedMoneyResponseDto(int savedMoney, int endMoney){
        super();
        this.savedMoney = savedMoney;
        this.endMoney = endMoney;
    }

    public static ResponseEntity<? super ChallengeSavedMoneyResponseDto> success (int savedMoney, int endMoney){
        ChallengeSavedMoneyResponseDto responseBody = new ChallengeSavedMoneyResponseDto(savedMoney, endMoney);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
