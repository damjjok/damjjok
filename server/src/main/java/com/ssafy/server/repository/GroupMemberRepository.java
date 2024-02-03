package com.ssafy.server.repository;

import com.ssafy.server.entity.GroupMemberEntity;
import com.ssafy.server.entity.GroupMemberId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupMemberRepository extends JpaRepository<GroupMemberEntity, GroupMemberId> {

}
