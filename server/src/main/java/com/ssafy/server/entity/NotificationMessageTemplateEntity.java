package com.ssafy.server.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@Entity
@Table(name = "notification_message_template")
public class NotificationMessageTemplateEntity {
    @Id
    @Column(name = "common_code_id", nullable = false)
    private Integer commonCodeId;

    @Column(name = "notification_message_title", nullable = false, columnDefinition = "varchar(100)")
    private String notificationMessageTitle;

    @Column(name = "notification_message_content", nullable = false, columnDefinition = "TEXT")
    private String notificationMessageContent;
}
