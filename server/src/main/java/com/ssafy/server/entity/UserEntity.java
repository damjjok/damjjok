package com.ssafy.server.entity;

import com.ssafy.server.dto.request.auth.SignUpRequestDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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

    @Column(name = "fcm_token", nullable = false)
    private String fcmToken;

    public UserEntity(SignUpRequestDto dto) {
        this.birth = dto.getBirth();
        this.sex = dto.getSex();
        this.email = dto.getEmail();
        this.userName = dto.getName();
        this.fcmToken = "";
    }

    public UserEntity(String email, String userName){
        this.birth = "00000000";
        this.sex = "male";
        this.email = email;
        this.userName = userName;
    }
}
