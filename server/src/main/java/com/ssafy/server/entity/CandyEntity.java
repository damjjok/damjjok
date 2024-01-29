package com.ssafy.server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;


@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "candy")
public class CandyEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "candy_id", nullable = false)
    private Integer candyId;

    @ManyToOne
    @JoinColumn(name="challenge_id")
    ChallengeEntity challengeEntity;

    @ManyToOne
    @JoinColumn(name="doctor_id")
    UserEntity userEntity;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
}
