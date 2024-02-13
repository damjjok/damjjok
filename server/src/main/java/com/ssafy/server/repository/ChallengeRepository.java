package com.ssafy.server.repository;


import com.ssafy.server.entity.ChallengeEntity;
import com.ssafy.server.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface ChallengeRepository extends JpaRepository<ChallengeEntity, Integer> {
    ChallengeEntity findByChallengeId(Integer challengeId);
    List<ChallengeEntity> findByGroupEntityGroupId(Integer groupId);
    boolean existsByUserIdAndStatusAndGroupEntityGroupId(Integer userId, String status, Integer groupId);

}
