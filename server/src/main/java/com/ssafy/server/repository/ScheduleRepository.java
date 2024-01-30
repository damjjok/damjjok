package com.ssafy.server.repository;

import com.ssafy.server.entity.ScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleEntity, Integer> {
    //해당 챌린지에 종료되지 않은 일정 조회 optional null 값
    Optional<ScheduleEntity> findByChallengeIdAndEndDateFalse(Integer ChallengeId);
}

