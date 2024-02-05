package com.ssafy.server.dto.response.cheermsg;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.cheermsg.CheerMessageDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
@Setter
public class CheerMsgListResponseDto extends ResponseDto {
    @Schema(description = "응원 메시지 목록")
    List<CheerMessageDto> list;

    public CheerMsgListResponseDto(List<CheerMessageDto> list){
        super();
        this.list = list;
    }

    public static ResponseEntity<CheerMsgListResponseDto> success(List<CheerMessageDto> list){
        CheerMsgListResponseDto responseBody = new CheerMsgListResponseDto(list);
        return ResponseEntity.ok(responseBody);
    }
}
