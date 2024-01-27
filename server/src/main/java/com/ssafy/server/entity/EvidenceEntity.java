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
@Table(name="evidence")
public class EvidenceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="evidence_id",nullable = false)
    private Integer evidenceId;

    @ManyToOne
    @JoinColumn(name="challenge_id")
    ChallengeEntity challengeEntity;

    @Column(name="evidence_title",nullable = false,columnDefinition = "varchar(100)")
    private String evidenceTitle;

    @Column(name="image_path",nullable = false)
    private String imagePath;

    @Column(name="image_date",nullable = false)
    private LocalDateTime imageDate;

    @Column(name="created_by",nullable = false)
    private Integer createdBy;

    @Column(name="created_at",nullable = false)
    private LocalDateTime createdAt;

    @Column(name="updated_by",nullable = false)
    private Integer updatedBy;

    @Column(name="updated_at",nullable = false)
    private LocalDateTime updatedAt;
}
