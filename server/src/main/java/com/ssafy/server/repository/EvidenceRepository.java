package com.ssafy.server.repository;

import com.ssafy.server.entity.ChallengeEntity;
import com.ssafy.server.entity.EvidenceEntity;
import com.ssafy.server.entity.TestimonyEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface EvidenceRepository extends JpaRepository<EvidenceEntity, Integer> {
    EvidenceEntity findByEvidenceId(int evidenceId);
    List<EvidenceEntity> findByChallengeEntity(ChallengeEntity challengeEntity);
    List<EvidenceEntity> findByChallengeEntity(ChallengeEntity challenge, Sort sort);

}
