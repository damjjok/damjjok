package com.ssafy.server.filter;

import com.ssafy.server.exception.CustomJwtException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtExceptionFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);    // SecurityConfig에서 JwtAuthenticationFilter 이전에 이 필터를 등록, JwtAuthenticationFilter에서 발생하는 예외를 여기서 핸들링.
        } catch (ExpiredJwtException e) { // 액세스 토큰 만료 시
            response.setStatus(HttpStatus.BAD_REQUEST.value());
            response.getWriter().write(e.getMessage());
        } catch (UnsupportedJwtException e) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write(e.getMessage());
        } catch (SignatureException e) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write(e.getMessage());
        } catch (MalformedJwtException e) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write(e.getMessage());
        } catch (CustomJwtException e) {
            // 적절한 HTTP 상태 코드 설정
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 Unauthorized

            // 클라이언트에게 보낼 에러 메시지 설정
            response.getWriter().write(e.getMessage());
        }
    }

}
