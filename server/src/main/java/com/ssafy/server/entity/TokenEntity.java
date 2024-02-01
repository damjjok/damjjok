package com.ssafy.server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.redis.core.RedisHash;


@Getter
//@Setter
@NoArgsConstructor
@AllArgsConstructor
//@Table(name="token")
@RedisHash(value = "sns")
public class TokenEntity {
    @Id
    private String refreshToken;

    private String email;
}
