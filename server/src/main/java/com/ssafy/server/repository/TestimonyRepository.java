package com.ssafy.server.repository;


import com.ssafy.server.entity.TestimonyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestimonyRepository extends JpaRepository<TestimonyEntity, Integer> {

    TestimonyEntity findByTestimonyId(Integer testimonyId);

}
