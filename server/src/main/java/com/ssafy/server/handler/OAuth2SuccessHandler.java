package com.ssafy.server.handler;

import com.ssafy.server.entity.CustomOAuth2User;
import com.ssafy.server.provider.JwtProvider;
import com.ssafy.server.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.temporal.ChronoUnit;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess (
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = "email@email.com"; // oAuth2User 에서 꺼내쓸것
        String accessToken = jwtProvider.createToken(email, 1, ChronoUnit.HOURS);
        String refreshToken = jwtProvider.createToken(email, 7, ChronoUnit.DAYS);

        boolean isExist = userRepository.existsByEmail(email);

        // redis 에 저장

        response.sendRedirect("http://localhost:3000/auth/oauth-response/" + email + "/" + accessToken + "/" + refreshToken + "/3600/" + isExist);

    }
}
