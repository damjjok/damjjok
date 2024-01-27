package com.ssafy.server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="group_member")
public class GroupMemberEntity {
    @EmbeddedId
    private GroupMemberId id;

    @ManyToOne
    @MapsId("groupId")
    @JoinColumn(name="group_id")
    GroupEntity groupEntity;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name="user_id")
    UserEntity userEntity;

    @Column(name="group_join_date",nullable = false)
    private LocalDateTime groupJoinDate;
}
