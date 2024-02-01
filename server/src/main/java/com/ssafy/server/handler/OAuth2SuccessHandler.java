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
        String accessToken = jwtProvider.createToken(email, 1, ChronoUnit.HOURS);
        String refreshToken = jwtProvider.createToken(email, 7, ChronoUnit.DAYS);

        boolean isExist = userRepository.existsByEmail(email);

//        response.setContentType("application/json;charset=UTF-8");

//        JSONObject jsonResponse = new JSONObject();
//        jsonResponse.put("accessToken", accessToken);
//        jsonResponse.put("refreshToken", refreshToken);
//        jsonResponse.put("email", email);
//
//        // JSON 응답 전송
//        response.getWriter().print(jsonResponse.toString());

        response.sendRedirect("http://localhost:3000/auth/oauth-response/" + email + "/" + accessToken + "/" + refreshToken + "/3600/" + isExist);

    }
}
