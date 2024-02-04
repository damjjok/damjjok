package com.ssafy.server.dto.response.cheermsg;

import com.ssafy.server.dto.ResponseDto;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;


@Getter
@Setter
public class CheerMsgCreateResponseDto extends ResponseDto {

    public CheerMsgCreateResponseDto(){
        super();
    }

    public static ResponseEntity<CheerMsgCreateResponseDto> success(){
        CheerMsgCreateResponseDto resposneBody = new CheerMsgCreateResponseDto();
        return ResponseEntity.ok(resposneBody);
    }
}
