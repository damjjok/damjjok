package com.ssafy.server.repository;

import com.ssafy.server.entity.GroupEntity;
import com.ssafy.server.entity.GroupMemberEntity;
import com.ssafy.server.entity.GroupMemberId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GroupMemberRepository extends JpaRepository<GroupMemberEntity, GroupMemberId> {
    @Query("SELECT gm.groupEntity FROM GroupMemberEntity gm WHERE gm.userEntity.id = :userId")
    List<GroupEntity> findGroupsByUserId(@Param("userId") Integer userId);
}
