package com.ssafy.server.repository;

import com.ssafy.server.entity.CheeringMessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CheeringMessageRepository extends JpaRepository<CheeringMessageEntity, Integer> {
    
}
