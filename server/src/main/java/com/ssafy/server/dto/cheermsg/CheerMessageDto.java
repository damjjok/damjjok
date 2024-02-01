package com.ssafy.server.dto.cheermsg;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CheerMessageDto {
    private String userName;
    private String content;
    private LocalDateTime createdAt;

}
