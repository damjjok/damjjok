package com.ssafy.server.repository;

import com.ssafy.server.entity.EvidenceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface EvidenceRepository extends JpaRepository<EvidenceEntity, Integer> {
}
