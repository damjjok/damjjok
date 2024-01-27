package com.ssafy.server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "attendance")
public class AttendanceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attendance_id", nullable = false)
    private Integer attendanceId;

    @ManyToOne
    @JoinColumn(name="challenge_id")
    ChallengeEntity challengeEntity;

    @ManyToOne
    @JoinColumn(name="created_by")
    UserEntity userEntity;

    @Column(name = "attendance_date", nullable = false)
    private LocalDateTime attendanceDate;
}
