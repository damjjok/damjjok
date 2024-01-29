package com.ssafy.server.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
@Getter
@Setter
@Entity
@Table(name = "cheering_message")
public class CheeringMessageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cheering_message_id", nullable = false)
    private Integer cheeringMessageId;

    @ManyToOne
    @JoinColumn(name="challenge_id")
    ChallengeEntity challengeEntity;

    @ManyToOne
    @JoinColumn(name="user_id")
    UserEntity userEntity;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
}
