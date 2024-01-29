package com.ssafy.server.repository;

import com.ssafy.server.entity.ChallengeEntity;
import com.ssafy.server.entity.ScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TruthRoomRepository extends JpaRepository<ScheduleEntity, Integer> {
    //해당 챌린지에 종료되지 않은 일정 조회
    ScheduleEntity findByChallengeIdAndEndDateFalse(ChallengeEntity ChallengeId);
}

