package com.ssafy.server.service.implement;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.request.auth.SignUpRequestDto;
import com.ssafy.server.dto.response.auth.SignUpResponseDto;
import com.ssafy.server.entity.UserEntity;
import com.ssafy.server.provider.JwtProvider;
import com.ssafy.server.repository.UserRepository;
import com.ssafy.server.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    String accessToken = "";

    @Override
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {
        try{

            //String email = dto.getEmail();
            //boolean isDuplicated = userRepository.existsByEmail(email);

            //if(isDuplicated) return SignUpResponseDto.duplicateEmail();

            UserEntity userEntity = new UserEntity(dto);
            userRepository.save(userEntity);

            accessToken = jwtProvider.createToken(userEntity.getEmail(), 1, ChronoUnit.HOURS);
            System.out.println(accessToken);


        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return SignUpResponseDto.success(accessToken);
    }
}
