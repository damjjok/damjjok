package com.ssafy.server.dto.challenge;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ChallengeDto {
    private int challgeId;
    private int groupId;
    private int userId; // 담쪽이
    private int initialMoney;
    private int savedMoney;
    private int savedPeriod;
    private LocalDateTime finalTruthRoomDate;
    private LocalDateTime endDate;
    private String status;
    private String determination;
    private String profilePath;

}
