package com.ssafy.server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="testimony")
public class TestimonyEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="testimony_id",nullable = false)
    private int testimonyId;

    @ManyToOne
    @JoinColumn(name="challenge_id")
    ChallengeEntity challengeEntity;

    @Column(name="testimony_title",nullable = false,columnDefinition = "varchar(100)")
    private String testimonyTitle;

    @Column(name="testimony_content",nullable = false,columnDefinition = "TEXT")
    private String testimonyContent;

    @Column(name="created_by",nullable = false)
    private int createdBy;

    @Column(name="created_at",nullable = false)
    private LocalDateTime createdAt;

    @Column(name="updated_by",nullable = false)
    private Integer updatedBy;

    @Column(name="updated_at",nullable = false)
    private LocalDateTime updatedAt;
}
