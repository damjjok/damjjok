package com.ssafy.server.service.implement;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.challenge.ChallengeDto;
import com.ssafy.server.dto.challenge.ChallengeMemeberDto;
import com.ssafy.server.dto.challenge.ImageDto;
import com.ssafy.server.dto.request.challenge.ChallengeChangeStatusRequestDto;
import com.ssafy.server.dto.request.challenge.ChallengeCreateRequestDto;
import com.ssafy.server.dto.request.challenge.ChallengeProfileModifyRequestDto;
import com.ssafy.server.dto.request.challenge.ChallengeRankRequestDto;
import com.ssafy.server.dto.response.challenge.*;
import com.ssafy.server.entity.*;
import com.ssafy.server.repository.*;
import com.ssafy.server.service.ChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@RequiredArgsConstructor
public class ChallengeServiceImpl implements ChallengeService {

    private final ChallengeRepository challengeRepository;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final ChallengeMemeberRepository challengeMemeberRepository;
    private final GroupMemberRepository groupMemberRepository;
    private final ImageRespository imageRespository;

    @Override
    public ResponseEntity<? super ChallengeCreateResponseDto> create(ChallengeCreateRequestDto dto) {
        try{

            GroupEntity groupEntity = groupRepository.findByGroupId(dto.getGroupId());

            ChallengeEntity challengeEntity = new ChallengeEntity();
            challengeEntity.setGroupEntity(groupEntity);
            challengeEntity.setUserId(dto.getUserId());
            challengeEntity.setInitialMoney(dto.getInitialMoney());
            challengeEntity.setSavedMoney(dto.getSavedMoney());
            challengeEntity.setSavedPeriod(dto.getSavedPeriod());

            LocalDateTime challenge_endDate = LocalDateTime.now().plusDays(dto.getSavedPeriod());
            challengeEntity.setFinalTruthRoomDate(challenge_endDate);
            challengeEntity.setEndDate(challenge_endDate);

            challengeEntity.setStatus("ON");
            challengeEntity.setDetermination("열심히 하겠습니다!");
            challengeEntity.setProfilePath("resources/profile/one.jpg");

            ChallengeEntity savedChallengeEntity = challengeRepository.save(challengeEntity);

            int value = groupEntity.getEndDate().compareTo(challenge_endDate);
            if(value == -1) {// 그룹 종료일 변경 ( 챌린지 종료일 + 한달뒤 )
                groupEntity.setEndDate(challenge_endDate.plusMonths(1));
                groupRepository.save(groupEntity);
            }
            // 챌린지 멤버도 넣어주기 ( 담쪽, 나머지 박사님들 )
            List<UserEntity> userList = groupMemberRepository.findUsersByGroupId(dto.getGroupId());
            userList.stream().forEach(e -> {

                ChallengeMemberId challengeMemberId = new ChallengeMemberId(savedChallengeEntity.getChallengeId(),e.getUserId());

                ChallengeMemberEntity entity = new ChallengeMemberEntity();
                entity.setId(challengeMemberId);
                entity.setChallengeEntity(savedChallengeEntity);
                entity.setUserEntity(e);
                if(e.getUserId() == dto.getUserId()) entity.setRole("Damjjok");
                else entity.setRole("Doctor");

                challengeMemeberRepository.save(entity);

            });


        }catch (Exception e){
            return ResponseDto.databaseError();
        }

        return ChallengeCreateResponseDto.success();
    }

    @Override
    public ResponseEntity<? super ChallengeProfileImageResponseDto> profileImages() {
        List<ImageDto> list = new ArrayList<>();
        try{

            for (int i = 1; i <= 4 ; i++) {
                ImageEntity entity = imageRespository.findByImageId(i);

                ImageDto dto = new ImageDto();
                dto.setImageId(entity.getImageId());
                dto.setImagePath(entity.getImagePath());
                list.add(dto);
            }

        }catch(Exception e){
            return ResponseDto.databaseError();
        }
        return ChallengeProfileImageResponseDto.success(list);
    }

    @Override
    public ResponseEntity<? super ChallengeListByGroupIdResponseDto> challengeList(int groupId) {
        List<ChallengeDto> list = new ArrayList<>();
        try{

            List<ChallengeEntity> entityList = challengeRepository.findByGroupEntityGroupId(groupId);

            entityList.stream().forEach(e -> {
                ChallengeDto dto = new ChallengeDto();
                dto.setChallengeId(e.getChallengeId());
                dto.setGroupId(e.getGroupEntity().getGroupId());

                UserEntity userEntity = userRepository.findByUserId(e.getUserId());
                dto.setUserName(userEntity.getUserName());
                dto.setInitialMoney(e.getInitialMoney());
                dto.setSavedMoney(e.getSavedMoney());
                dto.setSavedPeriod(e.getSavedPeriod());
                dto.setFinalTruthRoomDate(e.getFinalTruthRoomDate());
                dto.setEndDate(e.getEndDate());
                dto.setStatus(e.getStatus());
                dto.setDetermination(e.getDetermination());
                dto.setProfilePath(e.getProfilePath());
                dto.setCreatedAt(e.getCreatedAt());
                list.add(dto);
            });

        }catch (Exception e){
            return ResponseDto.databaseError();
        }
        return ChallengeListByGroupIdResponseDto.success(list);
    }

    @Override
    public ResponseEntity<? super ChallengeDetailResponseDto> challengeDetail(int challengeId) {
        ChallengeDto dto;
        try{
            ChallengeEntity entity = challengeRepository.findByChallengeId(challengeId);
            dto = new ChallengeDto(entity);
            UserEntity userEntity = userRepository.findByUserId(entity.getUserId());
            dto.setUserName(userEntity.getUserName());
        }catch (Exception e){
            return ResponseDto.databaseError();
        }
        return ChallengeDetailResponseDto.success(dto);
    }

    @Override
    public ResponseEntity<? super ChallengeMemberListResponseDto> challengeMemberList(int challengeId) {
        List<ChallengeMemeberDto> list = new ArrayList<>();
        try{

            List<ChallengeMemberEntity> entityList = challengeMemeberRepository.findByChallengeEntityChallengeId(challengeId);

            entityList.stream().forEach(e -> {
                ChallengeMemeberDto dto = new ChallengeMemeberDto(e);
                UserEntity userEntity = e.getUserEntity();
                dto.setUserName(userEntity.getUserName());
                list.add(dto);
            });

        }catch (Exception e){
            return ResponseDto.databaseError();
        }
        return ChallengeMemberListResponseDto.success(list);
    }

    @Override
    public ResponseEntity<? super ChallengeChangeStatusResponseDto> changeStatus(ChallengeChangeStatusRequestDto dto) {
        try{

            ChallengeEntity entity = challengeRepository.findByChallengeId(dto.getChallengeId());

            entity.setStatus(dto.getStatus());

            challengeRepository.save(entity);

        }catch (Exception e){
            return ResponseDto.databaseError();
        }
        return ChallengeChangeStatusResponseDto.success();
    }

    @Override
    public ResponseEntity<? super ChallengeProfileModifyResponseDto> modifyProfile(int challengeId, ChallengeProfileModifyRequestDto dto) {
        try{

            ChallengeEntity entity = challengeRepository.findByChallengeId(challengeId);

            entity.setDetermination(dto.getDetermination());
            entity.setProfilePath(dto.getImagePath());

            challengeRepository.save(entity);

        }catch (Exception e){
            return ResponseDto.databaseError();
        }
        return ChallengeProfileModifyResponseDto.success();
    }

    @Override
    public ResponseEntity<? super ChallengeRankResponseDto> challengeRank(ChallengeRankRequestDto dto) {
        int ranking;

        try{
            ChallengeEntity cur = challengeRepository.findByChallengeId(dto.getChallengeId());
            List<ChallengeEntity> list = challengeRepository.findAll();

            AtomicInteger rank = new AtomicInteger(1);
            AtomicInteger count = new AtomicInteger();
            int cur_day = (int) ChronoUnit.DAYS.between(cur.getCreatedAt().toLocalDate() , LocalDateTime.now());
            System.out.println(cur_day);
            list.stream().forEach(challenge-> {
                if(challenge.getStatus().equals("ON")){
                    count.addAndGet(1);
                    int nxt_day = (int) ChronoUnit.DAYS.between(challenge.getCreatedAt().toLocalDate() , LocalDateTime.now());
                    if(cur_day > nxt_day) rank.getAndIncrement();
                    System.out.println(nxt_day);
                }
            });

            ranking = (int)(( (double)rank.get() / (double) count.get() ) * 100);

        }catch (Exception e){
            return ResponseDto.databaseError();
        }
        return ChallengeRankResponseDto.success(ranking);
    }
}
