package com.ssafy.server.repository;

import com.ssafy.server.entity.ChallengeEntity;
import com.ssafy.server.entity.EvidenceEntity;
import com.ssafy.server.entity.TestimonyEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;


@Repository
public interface EvidenceRepository extends JpaRepository<EvidenceEntity, Integer> {
    EvidenceEntity findByEvidenceId(int evidenceId);
    List<EvidenceEntity> findByChallengeEntity(ChallengeEntity challengeEntity);
    List<EvidenceEntity> findByChallengeEntity(ChallengeEntity challenge, Sort sort);
    // 챌린지와 특정 날짜 이후에 생성된 증거가 있는지 확인하는 메서드
    boolean existsByChallengeEntityAndCreatedAtAfter(ChallengeEntity challenge, LocalDateTime date);

}
