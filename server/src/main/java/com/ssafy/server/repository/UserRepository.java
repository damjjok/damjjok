package com.ssafy.server.repository;


import com.ssafy.server.entity.CandyEntity;
import com.ssafy.server.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    UserEntity findByUserId(int userId);
    boolean existsByEmail(String email);

}
