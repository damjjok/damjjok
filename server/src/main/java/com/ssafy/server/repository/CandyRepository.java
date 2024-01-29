package com.ssafy.server.repository;


import com.ssafy.server.entity.CandyEntity;
import com.ssafy.server.entity.TestimonyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandyRepository extends JpaRepository<CandyEntity, Integer> {

}
