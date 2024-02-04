package com.ssafy.server.repository;

import com.ssafy.server.entity.ChallengeMemberEntity;
import com.ssafy.server.entity.ChallengeMemberId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChallengeMemeberRepository extends JpaRepository<ChallengeMemberEntity, ChallengeMemberId> {
    List<ChallengeMemberEntity> findByChallengeEntityChallengeId(int challengeId);
}
