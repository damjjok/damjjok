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
import com.ssafy.server.exception.ChallengeNotFoundException;
import com.ssafy.server.exception.UserNotFoundException;
import com.ssafy.server.repository.*;
import com.ssafy.server.service.CandyService;
import com.ssafy.server.service.CheerMsgService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
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

        int challengeId = dto.getChallengeId();
        int doctorId = dto.getUserId();

        ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);
        if(challengeEntity == null) throw new ChallengeNotFoundException();

        UserEntity userEntity = userRepository.findByUserId(doctorId);
        if(userEntity == null) throw new UserNotFoundException();

        CandyEntity candyEntity = new CandyEntity();
        candyEntity.setChallengeEntity(challengeEntity);
        candyEntity.setUserEntity(userEntity);

        candyRepository.save(candyEntity);

        return CandyCreateResponseDto.success();
    }

    @Override
    public ResponseEntity<? super CandyCountResponseDto> count(CandyCountRequestDto dto) {
        int cnt = 0;

        int challengeId = dto.getChallengeId();

        ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);
        if(challengeEntity == null) throw new ChallengeNotFoundException();

        cnt = candyRepository.countByChallengeEntity(challengeEntity);

        return CandyCountResponseDto.success(cnt);
    }

    @Override
    public ResponseEntity<? super BestCheeringMemberResponseDto> bestMember(BestCheeringMemberRequestDto dto) {

        int challengeId = dto.getChallengeId();
        ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);
        if(challengeEntity == null) throw new ChallengeNotFoundException();

        // 캔디와 응원 메시지의 사용자별 집계
        Map<UserEntity, Integer> candyCountByUser = candyRepository.findByChallengeEntity(challengeEntity)
                .stream()
                .collect(Collectors.groupingBy(CandyEntity::getUserEntity, Collectors.summingInt(e -> 1)));

        Map<UserEntity, Integer> cheerMsgCountByUser = cheeringMessageRepository.findByChallengeEntity(challengeEntity)
                .stream()
                .collect(Collectors.groupingBy(CheeringMessageEntity::getUserEntity, Collectors.summingInt(e -> 1)));

        // 사용자별로 캔디 수와 응원 메시지 수의 합계 계산 및 최대값 찾기
        Map<UserEntity, Integer> totalSupportByUser = new HashMap<>();

        // 캔디 카운트와 응원 메시지 카운트 병합
        candyCountByUser.forEach((user, candies) -> totalSupportByUser.merge(user, candies, Integer::sum));
        cheerMsgCountByUser.forEach((user, messages) -> totalSupportByUser.merge(user, messages, Integer::sum));

        // 최대 응원 횟수와 해당 사용자 찾기
        Map.Entry<UserEntity, Integer> bestSupporter = totalSupportByUser.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .orElse(null);

        if (bestSupporter == null) {
            return ResponseEntity.ok(new BestCheeringMemberResponseDto("", 0, 0)); // 응원왕이 없는 경우
        }

        UserEntity bestUser = bestSupporter.getKey();
        String bestUserName = bestUser.getUserName();
        int bestSupportCount = bestSupporter.getValue();

        // 캔디 카운트와 응원 메시지 카운트에서 최종 값 조회
        int candies = candyCountByUser.getOrDefault(bestUser, 0);
        int messages = cheerMsgCountByUser.getOrDefault(bestUser, 0);

        return BestCheeringMemberResponseDto.success(bestUserName,candies,messages);

    }

}
