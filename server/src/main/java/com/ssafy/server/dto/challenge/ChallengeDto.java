package com.ssafy.server.dto.challenge;

import com.ssafy.server.entity.ChallengeEntity;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ChallengeDto {
    private int challgeId;
    private int groupId;
    private int userId;
    private String userName; // 담쪽이
    private int initialMoney;
    private int savedMoney;
    private int savedPeriod;
    private LocalDateTime finalTruthRoomDate;
    private LocalDateTime endDate;
    private String status;
    private String determination;
    private String profilePath;
    private LocalDateTime createdAt;

    public ChallengeDto() {
    }

    public ChallengeDto(ChallengeEntity entity){
        this.challgeId = entity.getChallengeId();
        this.groupId = entity.getGroupEntity().getGroupId();
        this.userId = entity.getUserId();
        this.initialMoney = entity.getInitialMoney();
        this.savedMoney = entity.getSavedMoney();
        this.savedPeriod = entity.getSavedPeriod();
        this.finalTruthRoomDate = entity.getFinalTruthRoomDate();
        this.endDate = entity.getEndDate();
        this.status = entity.getStatus();
        this.determination = entity.getDetermination();
        this.profilePath = entity.getProfilePath();
    }

}
