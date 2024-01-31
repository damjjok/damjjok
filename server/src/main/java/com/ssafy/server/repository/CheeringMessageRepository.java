package com.ssafy.server.repository;

import com.ssafy.server.entity.ChallengeEntity;
import com.ssafy.server.entity.CheeringMessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CheeringMessageRepository extends JpaRepository<CheeringMessageEntity, Integer> {

    List<CheeringMessageEntity> findByChallengeEntity(ChallengeEntity challengeEntity);
    
}
