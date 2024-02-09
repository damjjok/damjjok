package com.ssafy.server.repository;


import com.ssafy.server.entity.CandyEntity;
import com.ssafy.server.entity.ChallengeEntity;
import com.ssafy.server.entity.TestimonyEntity;
import com.ssafy.server.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandyRepository extends JpaRepository<CandyEntity, Integer> {
    int countByChallengeEntity(ChallengeEntity challengeEntity);
    List<CandyEntity> findByChallengeEntity(ChallengeEntity challengeEntity);
}
