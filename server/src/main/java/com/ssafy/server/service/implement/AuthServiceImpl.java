package com.ssafy.server.service.implement;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.request.auth.SignUpRequestDto;
import com.ssafy.server.dto.request.auth.TokenRequestDto;
import com.ssafy.server.dto.response.auth.FcmTokenResponseDto;
import com.ssafy.server.dto.response.auth.SignUpResponseDto;
import com.ssafy.server.dto.response.auth.TokenResponseDto;
import com.ssafy.server.entity.UserEntity;
import com.ssafy.server.exception.CustomJwtException;
import com.ssafy.server.provider.JwtProvider;
import com.ssafy.server.repository.UserRepository;
import com.ssafy.server.service.AuthService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final RedisTemplate<String, String> redisTemplate;

    String accessToken = "";
    String refreshToken = "";

    @Override
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {
        try{
            UserEntity userEntity = new UserEntity(dto);
            userRepository.save(userEntity);

        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return SignUpResponseDto.success();
    }

    @Override
    public ResponseEntity<? super TokenResponseDto> createNewToken(TokenRequestDto dto) {
        try{

            /*
            refreshToken 으로 새로운 Token 요청
            1. refreshToken 유효한지 검증
            2. redis 에 refreshToken 있는지 확인
            3. 있다면, token 들 새로 발급해줘서 던지고, redis에 refreshToken 갈아끼우기
             */
            ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

            String email = jwtProvider.validateToken(dto.getRefreshToken());
            if(!email.equals(valueOperations.get(dto.getRefreshToken()))){
                return TokenResponseDto.expiredAndNotExistToken();
            }

            accessToken = jwtProvider.createToken(email, 5, ChronoUnit.SECONDS);
            refreshToken = jwtProvider.createToken(email, 5, ChronoUnit.SECONDS);

            redisTemplate.opsForHash().delete(dto.getRefreshToken());
            valueOperations.set(refreshToken, email);

        }catch(CustomJwtException e){
            throw new CustomJwtException(e.getMessage(),e);
        }
        return TokenResponseDto.success(accessToken,refreshToken);
    }

    @Override
    public ResponseEntity<? super FcmTokenResponseDto> changeFcmToken(String fcmToken) {
        try{

            //UserEntity userEntity = userRepository.

        }catch (Exception e){
            return ResponseDto.databaseError();
        }
        return FcmTokenResponseDto.success();
    }
}
