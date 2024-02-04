package com.ssafy.server.repository;


import com.ssafy.server.entity.CandyEntity;
import com.ssafy.server.entity.GroupEntity;
import com.ssafy.server.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    UserEntity findByUserId(int userId);
    UserEntity findByEmail(String email);
    boolean existsByEmail(String email);
    List<UserEntity> findByEmailContaining(String email);
}
