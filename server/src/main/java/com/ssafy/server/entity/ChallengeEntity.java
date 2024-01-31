package com.ssafy.server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="challenge")
public class ChallengeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="challenge_id",nullable = false)
    private Integer challengeId;

    @ManyToOne
    @JoinColumn(name="group_id")
    GroupEntity groupEntity;

    @Column(name="user_id",nullable = false)
    private Integer userId;

    @Column(name="initial_money",nullable = false)
    private Integer initialMoney;

    @Column(name="saved_money",nullable = false)
    private Integer savedMoney;

    @Column(name="saved_period",nullable = false)
    private Integer savedPeriod;

    @Column(name="final_truth_room_date",nullable = false)
    private LocalDateTime finalTruthRoomDate;

    @Column(name="end_date",nullable = false)
    private LocalDateTime endDate;

    @CreationTimestamp
    @Column(name="created_at",nullable = false)
    private LocalDateTime createdAt;

    @Column(name="status",nullable = false,columnDefinition = "varchar(20)")
    private String status;

    @Column(name="determination",nullable = false,columnDefinition = "varchar(100)")
    private String determination;

    @Column(name="profile_path",nullable = false,columnDefinition = "varchar(255)")
    private String profilePath;
}
