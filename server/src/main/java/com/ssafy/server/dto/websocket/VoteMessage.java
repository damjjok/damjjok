package com.ssafy.server.dto.websocket;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
// 사용자 투표 메시지
public class VoteMessage {
    private int choice;
    // 생성자, getter, setter 생략
}
