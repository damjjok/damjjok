package com.ssafy.server.handler;

import com.ssafy.server.entity.TokenEntity;
import com.ssafy.server.entity.UserEntity;
import com.ssafy.server.provider.JwtProvider;
import com.ssafy.server.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.temporal.ChronoUnit;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final RedisTemplate<String, String> redisTemplate;

    @Override
    public void onAuthenticationSuccess (
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, String> responseMap =(Map<String, String>) oAuth2User.getAttributes().get("response");

        String email = responseMap.get("email");// oAuth2User 에서 꺼내쓸것
        String userName = responseMap.get("name");
        String encodedEmail = URLEncoder.encode(email, StandardCharsets.UTF_8.toString());
        String encodedName = URLEncoder.encode(userName, StandardCharsets.UTF_8.toString());

        //boolean isExist = userRepository.existsByEmail(email);
        UserEntity userEntity = userRepository.findByEmail(email);

        if(userEntity != null){ // 가입되어있음 -> 바로 토큰 발행해서 줌
            String accessToken = jwtProvider.createToken(userEntity.getUserId(),email,userName, 180, ChronoUnit.DAYS);
            String refreshToken = jwtProvider.createToken(userEntity.getUserId(),email,userName, 180, ChronoUnit.DAYS);

            // redis 에 저장 ( refreshToken, email )
            ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
            valueOperations.set(refreshToken, email);
            response.sendRedirect("http://localhost:8080/auth/oauth-response?" +
                    "accessToken=" + accessToken + "&" +
                    "refreshToken=" + refreshToken
            );
        }
        else{
            response.sendRedirect("http://localhost:8080/auth/oauth-response?" +
                    "email=" +email + "&" +
                    "name=" + encodedName
            );
        }
    }
}
