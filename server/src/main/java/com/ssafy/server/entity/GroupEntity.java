package com.ssafy.server.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="user_group")
public class GroupEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="group_id",nullable = false)
    private Integer groupId;

    @Column(name="group_name",nullable = false,columnDefinition = "varchar(100)")
    private String groupName;

    @CreationTimestamp
    @Column(name="created_at",nullable = false)
    private LocalDateTime createdAt;

    @Column(name="end_date",nullable = false)
    private LocalDateTime endDate;

    @Column(name="created_by",nullable = false)
    private Integer createdBy;

    @Column(name="invitation_link",nullable = false)
    private String invitationLink;
}
