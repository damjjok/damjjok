package com.ssafy.server.dto.websocket;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class websocketDto {
    boolean isReady;
    boolean isNext;
    boolean isPass;
    Integer fineAmount;
}
