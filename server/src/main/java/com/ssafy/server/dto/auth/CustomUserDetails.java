package com.ssafy.server.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CustomUserDetails {
    private int userId;
    private String email;
    private String userName;

}

