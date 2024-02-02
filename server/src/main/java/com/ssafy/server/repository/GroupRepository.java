package com.ssafy.server.repository;

import com.ssafy.server.entity.GroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<GroupEntity, Integer> {
}
