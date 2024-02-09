package com.ssafy.server.dto.response.challenge;

import com.ssafy.server.dto.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class ChallengeSavedMoneyResponseDto extends ResponseDto {

    private int savedMoney;

    public ChallengeSavedMoneyResponseDto(int savedMoney){
        super();
        this.savedMoney = savedMoney;
    }

    public static ResponseEntity<? super ChallengeSavedMoneyResponseDto> success (int savedMoney){
        ChallengeSavedMoneyResponseDto responseBody = new ChallengeSavedMoneyResponseDto(savedMoney);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
