package com.ssafy.server.filter;

import com.ssafy.server.dto.auth.CustomUserDetails;
import com.ssafy.server.entity.UserEntity;
import com.ssafy.server.exception.CustomJwtException;
import com.ssafy.server.provider.JwtProvider;
import com.ssafy.server.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
@RequiredArgsConstructor // 필수 요소에 대한 생성자를 만들어줌
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            String token = parseBearerToken(request);

            if(token == null) {
                filterChain.doFilter(request,response);
                return;
            }

            Jws<Claims> parsedToken = jwtProvider.validateToken(token);

            int userId = parsedToken.getBody().get("userId", Integer.class);
            String email = parsedToken.getBody().get("email", String.class);
            String userName = parsedToken.getBody().get("userName", String.class);

            if(email == null){
                filterChain.doFilter(request,response);
                return;
            }

            //user 정보 꺼내오기
            //현재는 관리자, 사용자 역할구분이 없기 때문에 따로 역할을 부여하지 않는다
            //UserEntity userEntity = userRepository.findByEmail(email);
            //String role = userEntity.getRole(); // role : ROLE_USER, ROLE_ADMIN

            // 꼭 규칙을 지킬 것. ROLE_DEVELOPER, ROLE_BOSS <- 이런 형태로 작업을 해달라
            //List<GrantedAuthority> authorities = new ArrayList<>();
            //authorities.add(new SimpleGrantedAuthority(role));

            CustomUserDetails customUserDetails = new CustomUserDetails(userId,email,userName);

            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();

            AbstractAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(customUserDetails, null, Collections.emptyList());// 1: 유저정보
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            securityContext.setAuthentication(authenticationToken);
            SecurityContextHolder.setContext(securityContext);

        }
        catch (CustomJwtException e){
            throw new CustomJwtException(e.getMessage(),e);
        }

        filterChain.doFilter(request,response); // 다음 필터로 넘어가도록 만들어줌
    }

    private String parseBearerToken(HttpServletRequest request){// request 객체부터 token 값을 가져옴
        String authorization = request.getHeader("Authorization");

        boolean hasAuthorization = StringUtils.hasText(authorization);// 실제고 값이 Text 가 존재하는지 찾아즘 = hasText
        if(!hasAuthorization) return null;

        boolean isBearer = authorization.startsWith("Bearer ");
        if(!isBearer) return null;

        String token = authorization.substring(7);
        return token;
    }
}
