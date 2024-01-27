package com.ssafy.server.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
@Entity
@Table(name = "notification")
@Getter
@Setter
public class NotificationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id", nullable = false)
    private Integer notificationId;

    @ManyToOne
    @JoinColumn(name="receiving_member_id")
    UserEntity userEntity;

    @ManyToOne
    @JoinColumn(name="common_code_id")
    CommonCodeEntity commonCodeEntity;

    @Column(name = "notification_contents", nullable = false, columnDefinition = "TEXT")
    private String notificationContents; // 기본값 설정

    @Column(name = "link", nullable = false, columnDefinition = "varchar(255)")
    private String link; // 기본값 설정

    @Column(name = "read_or_not", nullable = false, columnDefinition = "boolean default false")
    private Boolean readOrNot; // 기본값 설정

    @Column(name = "send_date", nullable = false)
    private LocalDateTime sendDate;
}
