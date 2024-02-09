package com.ssafy.server.service.implement;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.request.candy.BestCheeringMemberRequestDto;
import com.ssafy.server.dto.request.candy.CandyCountRequestDto;
import com.ssafy.server.dto.request.candy.CandyCreateRequestDto;
import com.ssafy.server.dto.response.candy.BestCheeringMemberResponseDto;
import com.ssafy.server.dto.response.candy.CandyCountResponseDto;
import com.ssafy.server.dto.response.candy.CandyCreateResponseDto;
import com.ssafy.server.entity.CandyEntity;
import com.ssafy.server.entity.ChallengeEntity;
import com.ssafy.server.entity.CheeringMessageEntity;
import com.ssafy.server.entity.UserEntity;
import com.ssafy.server.repository.*;
import com.ssafy.server.service.CandyService;
import com.ssafy.server.service.CheerMsgService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CandyServiceImpl implements CandyService {

    private final ChallengeRepository challengeRepository;
    private final CandyRepository candyRepository;
    private final UserRepository userRepository;
    private final CheeringMessageRepository cheeringMessageRepository;

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

    @Override
    public ResponseEntity<? super BestCheeringMemberResponseDto> bestMember(BestCheeringMemberRequestDto dto) {
        try {
            int challengeId = dto.getChallengeId();
            ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);
            // 캔디와 응원 메시지의 사용자별 집계
            Map<UserEntity, Integer> candyCountByUser = candyRepository.findByChallengeEntity(challengeEntity)
                    .stream()
                    .collect(Collectors.groupingBy(CandyEntity::getUserEntity, Collectors.summingInt(e -> 1)));

            Map<UserEntity, Integer> cheerMsgCountByUser = cheeringMessageRepository.findByChallengeEntity(challengeEntity)
                    .stream()
                    .collect(Collectors.groupingBy(CheeringMessageEntity::getUserEntity, Collectors.summingInt(e -> 1)));

            // 사용자별로 캔디 수와 응원 메시지 수의 합계 계산 및 최대값 찾기
            Integer bestUserId = null;
            int maxSupport = 0;
            for (Map.Entry<UserEntity, Integer> entry : candyCountByUser.entrySet()) {
                UserEntity user = entry.getKey();
                int totalSupport = entry.getValue() + cheerMsgCountByUser.getOrDefault(user, 0);
                if (totalSupport > maxSupport) {
                    bestUserId = user.getUserId();
                    maxSupport = totalSupport;
                }
            }

            if (bestUserId == null) {
                return ResponseEntity.ok(new BestCheeringMemberResponseDto("", 0, 0)); // 응원왕이 없는 경우
            }

            // 최종 응원왕의 userName 조회
            UserEntity bestUser = userRepository.findByUserId(bestUserId);
            String bestUserName = bestUser != null ? bestUser.getUserName() : "응원왕 없음";

            // 최종 응원왕 정보 생성
            BestCheeringMemberResponseDto responseDto = new BestCheeringMemberResponseDto(
                    bestUserName,
                    candyCountByUser.getOrDefault(bestUser, 0),
                    cheerMsgCountByUser.getOrDefault(bestUser, 0)
            );

            return ResponseEntity.ok(responseDto);
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
