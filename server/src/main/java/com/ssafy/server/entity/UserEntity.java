package com.ssafy.server.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "user")
@Getter
@Setter
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "birth", nullable = false, length = 50)
    private String birth;

    @Column(name = "sex", nullable = false, length = 5)
    private String sex;

    @Column(name = "email", nullable = false, unique = true, length = 50)
    private String email;

    @Column(name = "user_name", nullable = false, length = 10)
    private String userName;

    @CreationTimestamp
    @Column(name = "join_date", nullable = false)
    private LocalDateTime joinDate;
}
