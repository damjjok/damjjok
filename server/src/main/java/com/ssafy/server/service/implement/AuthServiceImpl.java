package com.ssafy.server.service.implement;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.request.auth.SignUpRequestDto;
import com.ssafy.server.dto.response.auth.SignUpResponseDto;
import com.ssafy.server.entity.UserEntity;
import com.ssafy.server.repository.UserRepository;
import com.ssafy.server.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    @Override
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {
        try{

            String email = dto.getEmail();
            boolean isDuplicated = userRepository.existsByEmail(email);

            if(isDuplicated) return SignUpResponseDto.duplicateEmail();

            UserEntity userEntity = new UserEntity(dto);
            userRepository.save(userEntity);

        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return SignUpResponseDto.success();
    }
}
