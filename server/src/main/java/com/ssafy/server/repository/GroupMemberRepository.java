package com.ssafy.server.repository;

import com.ssafy.server.entity.GroupEntity;
import com.ssafy.server.entity.GroupMemberEntity;
import com.ssafy.server.entity.GroupMemberId;
import com.ssafy.server.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GroupMemberRepository extends JpaRepository<GroupMemberEntity, GroupMemberId> {
    @Query("SELECT gm.groupEntity FROM GroupMemberEntity gm WHERE gm.userEntity.id = :userId ORDER BY gm.groupEntity.groupName ASC")
    List<GroupEntity> findGroupsByUserId(@Param("userId") Integer userId);

    @Query("SELECT gm.userEntity from GroupMemberEntity gm WHERE gm.groupEntity.id = :groupId")
    List<UserEntity> findUsersByGroupId(@Param("groupId") Integer groupId);
}
