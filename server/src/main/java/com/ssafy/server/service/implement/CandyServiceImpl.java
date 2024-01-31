package com.ssafy.server.service.implement;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.request.candy.CandyCountRequestDto;
import com.ssafy.server.dto.request.candy.CandyCreateRequestDto;
import com.ssafy.server.dto.response.candy.CandyCountResponseDto;
import com.ssafy.server.dto.response.candy.CandyCreateResponseDto;
import com.ssafy.server.entity.CandyEntity;
import com.ssafy.server.entity.ChallengeEntity;
import com.ssafy.server.entity.UserEntity;
import com.ssafy.server.repository.CandyRepository;
import com.ssafy.server.repository.ChallengeRepository;
import com.ssafy.server.repository.UserRepository;
import com.ssafy.server.service.CandyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CandyServiceImpl implements CandyService {

    private final ChallengeRepository challengeRepository;
    private final CandyRepository candyRepository;
    private final UserRepository userRepository;

    @Override
    public ResponseEntity<? super CandyCreateResponseDto> create(CandyCreateRequestDto dto) {
        try{
            int challengeId = dto.getChallengeId();
            int doctorId = dto.getUserId();

            ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);
            UserEntity userEntity = userRepository.findByUserId(doctorId);
            CandyEntity candyEntity = new CandyEntity();
            candyEntity.setChallengeEntity(challengeEntity);
            candyEntity.setUserEntity(userEntity);

            candyRepository.save(candyEntity);


        }catch (Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return CandyCreateResponseDto.success();
    }

    @Override
    public ResponseEntity<? super CandyCountResponseDto> count(CandyCountRequestDto dto) {
        int cnt = 0;
        try{
            int challengeId = dto.getChallengeId();

            ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);

            cnt = candyRepository.countByChallengeEntity(challengeEntity);


        }catch (Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return CandyCountResponseDto.success(cnt);
    }
}
