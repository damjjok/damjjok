package com.ssafy.server.service.implement;

import com.ssafy.server.common.ResponseCode;
import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.auth.CustomUserDetails;
import com.ssafy.server.dto.request.alarm.FCMTokenRequestDto;
import com.ssafy.server.dto.request.auth.SignUpRequestDto;
import com.ssafy.server.dto.request.auth.TokenRequestDto;
import com.ssafy.server.dto.response.auth.FcmTokenResponseDto;
import com.ssafy.server.dto.response.auth.SignUpResponseDto;
import com.ssafy.server.dto.response.auth.TokenResponseDto;
import com.ssafy.server.entity.UserEntity;
import com.ssafy.server.exception.CustomException;
import com.ssafy.server.exception.CustomJwtException;
import com.ssafy.server.provider.JwtProvider;
import com.ssafy.server.repository.UserRepository;
import com.ssafy.server.service.AuthService;
import io.jsonwebtoken.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    @Transactional
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {

        UserEntity userEntity = new UserEntity(dto);
        userRepository.save(userEntity);

        return SignUpResponseDto.success();
    }

    @Override
    @Transactional
    public ResponseEntity<? super TokenResponseDto> createNewToken(TokenRequestDto dto) {
        try{

            /*
            refreshToken 으로 새로운 Token 요청
            1. refreshToken 유효한지 검증
            2. redis 에 refreshToken 있는지 확인
            3. 있다면, token 들 새로 발급해줘서 던지고, redis에 refreshToken 갈아끼우기
             */
            ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

            Jws<Claims> parsedToken = jwtProvider.validateToken(dto.getRefreshToken());

            int userId = parsedToken.getBody().get("userId", Integer.class);
            String email = parsedToken.getBody().get("email", String.class);
            String userName = parsedToken.getBody().get("userName", String.class);

            if(!email.equals(valueOperations.get(dto.getRefreshToken()))){
                return TokenResponseDto.expiredAndNotExistToken();
            }

            accessToken = jwtProvider.createToken(userId, email, userName, 5, ChronoUnit.DAYS);
            refreshToken = jwtProvider.createToken(userId, email, userName, 5, ChronoUnit.DAYS);

            redisTemplate.delete(dto.getRefreshToken());
            valueOperations.set(refreshToken, email);

        }catch(CustomJwtException e){
            throw new CustomException(HttpStatus.UNAUTHORIZED, ResponseCode.UNAUTHORIZED, "사용자 인증 다시 해야합니다.");
        }
        return TokenResponseDto.success(accessToken,refreshToken);
    }

    @Override
    @Transactional
    public ResponseEntity<? super FcmTokenResponseDto> savedFcmToken(FCMTokenRequestDto dto) {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

            String email = customUserDetails.getEmail();
            //System.out.println(email + "@@@@@@@");

            UserEntity userEntity = userRepository.findByEmail(email);
            userEntity.setFcmToken(dto.getFcmToken());

            userRepository.save(userEntity);

        }catch (Exception e){
            return ResponseDto.databaseError();
        }
        return FcmTokenResponseDto.success();
    }
}
