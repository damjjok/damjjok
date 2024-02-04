package com.ssafy.server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "challenge_member")
public class ChallengeMemberEntity {
    @EmbeddedId
    private ChallengeMemberId id; //복합키

    @ManyToOne
    @MapsId("challengeId") // ChallengeMemberId 내의 challengeId 필드에 매핑
    @JoinColumn(name="challenge_id")
    ChallengeEntity challengeEntity;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name="user_id")
    UserEntity userEntity;

    @Column(name = "role", nullable = false, columnDefinition = "varchar(10)")
    private String role; // 기본값으로 빈 문자열 설정

    @Column(name = "challenge_join_date", nullable = false)
    @CreationTimestamp
    private LocalDateTime challengeJoinDate;
}
