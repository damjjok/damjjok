package com.ssafy.server.handler;

import com.ssafy.server.entity.CustomOAuth2User;
import com.ssafy.server.provider.JwtProvider;
import com.ssafy.server.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
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

        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getName();
        //String token = jwtProvider.createToken(email, 1, ChronoUnit.HOURS); // jwt token 만들어서 던져줌
        // 사용자 인증이 완료되면 이 사용자가 회원가입이 되어있는 사용자인지 본 후에, 회원가입 안되있으면
        // 사용자 정보 가지고 회원가입 창으로 이동함

        boolean isExist = userRepository.existsByEmail(email);

        response.sendRedirect("http://localhost:3000/auth/oauth-response/" + email + "/3600/" + isExist);

    }
}
