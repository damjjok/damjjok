package com.ssafy.server.repository;


import com.ssafy.server.entity.ChallengeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChallengeRepository extends JpaRepository<ChallengeEntity, Integer> {
    ChallengeEntity findByChallengeId(Integer challengeId);
}
