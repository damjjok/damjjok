package com.ssafy.server.dto.challenge;

import com.ssafy.server.entity.ChallengeMemberEntity;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Objects;

@Getter
@Setter
public class ChallengeMemeberDto {
    private int userId;
    private LocalDateTime challengeJoinDate;
    private String role;

    public ChallengeMemeberDto(ChallengeMemberEntity entity){
        this.userId = entity.getUserEntity().getUserId();
        this.challengeJoinDate = entity.getChallengeJoinDate();
        this.role = entity.getRole();
    }
}
