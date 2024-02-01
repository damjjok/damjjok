package com.ssafy.server.provider;

import com.ssafy.server.exception.CustomJwtException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Component
public class JwtProvider {

    @Value("${secret-key}")
    private String secretKey;

    // 토큰 발급 공통 로직
    public String createToken(String userId, long duration, ChronoUnit unit){
        Date expiredDate = Date.from(Instant.now().plus(duration, unit));
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                .signWith(key, SignatureAlgorithm.HS256)
                .setSubject(userId).setIssuedAt(new Date()).setExpiration(expiredDate)
                .compact();
    }

    public String validateToken(String token){
        String subject = null;
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        try{

            subject = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();

        }catch (ExpiredJwtException e){
            System.out.println("token 만료");
            throw new CustomJwtException("Token is Expired.",e);
        }catch (SignatureException | UnsupportedJwtException | MalformedJwtException e){
            throw new CustomJwtException("Token in not valid.",e);
        }

        return subject;
    }

}
