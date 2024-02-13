package com.ssafy.server.repository;

import com.ssafy.server.entity.CommonCodeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommonCodeRepository extends JpaRepository<CommonCodeEntity, Integer> {
   CommonCodeEntity findByCommonCodeId(Integer commonCodeId);
}
