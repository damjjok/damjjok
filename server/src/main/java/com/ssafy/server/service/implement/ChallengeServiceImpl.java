package com.ssafy.server.service.implement;

import com.ssafy.server.common.ResponseCode;
import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.auth.CustomUserDetails;
import com.ssafy.server.dto.challenge.ChallengeDto;
import com.ssafy.server.dto.challenge.ChallengeMemeberDto;
import com.ssafy.server.dto.challenge.ImageDto;
import com.ssafy.server.dto.request.challenge.ChallengeChangeStatusRequestDto;
import com.ssafy.server.dto.request.challenge.ChallengeCreateRequestDto;
import com.ssafy.server.dto.request.challenge.ChallengeProfileModifyRequestDto;
import com.ssafy.server.dto.request.challenge.ChallengeRankRequestDto;
import com.ssafy.server.dto.request.notification.NotificationCreateRequestDto;
import com.ssafy.server.dto.response.challenge.*;
import com.ssafy.server.entity.*;
import com.ssafy.server.exception.*;
import com.ssafy.server.repository.*;
import com.ssafy.server.service.ChallengeService;
import com.ssafy.server.service.NotificationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
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

    private final NotificationService notificationService;

    @Override
    @Transactional
    public ResponseEntity<? super ChallengeCreateResponseDto> create(ChallengeCreateRequestDto dto) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || !(authentication.getPrincipal() instanceof CustomUserDetails)){
            throw new CustomAuthenticationException("사용자 인증 다시 해주세요.");
        }

        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        int userId = customUserDetails.getUserId();
        String damjjokName = customUserDetails.getUserName();

        // 먼저 진행중인 챌린지가 없을경우에만 챌린지 생성 가능
        if(challengeRepository.existsByUserIdAndStatusAndGroupEntityGroupId(userId,"PROGRESS",dto.getGroupId())){
            throw new DuplicateChallengeException();
        }

        GroupEntity groupEntity = groupRepository.findByGroupId(dto.getGroupId());

        if(groupEntity == null){
            throw new GroupNotFoundException();
        }

        ChallengeEntity challengeEntity = new ChallengeEntity();
        challengeEntity.setGroupEntity(groupEntity);
        challengeEntity.setUserId(userId);
        challengeEntity.setDuration(dto.getDuration());
        challengeEntity.setInitialMoney(dto.getInitialMoney());
        challengeEntity.setSavedMoney(dto.getSavedMoney());
        challengeEntity.setSavedPeriod(dto.getSavedPeriod());

        LocalDateTime challenge_endDate = LocalDateTime.now().plusDays(dto.getDuration());
        challengeEntity.setFinalTruthRoomDate(LocalDateTime.now());
        challengeEntity.setEndDate(challenge_endDate);

        challengeEntity.setStatus("PROGRESS");
        challengeEntity.setDetermination("열심히 하겠습니다!");
        challengeEntity.setProfilePath("avatar1.png");

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
            if(e.getUserId() == userId) entity.setRole("Damjjok");
            else entity.setRole("Doctor");

            // 챌린지 멤버 저장
            challengeMemeberRepository.save(entity);

            // 챌린지 멤버들에게 알림 보내기 ( 담쪽 제외 )
            if(e.getUserId() != userId) {
                NotificationCreateRequestDto ncrDto = new NotificationCreateRequestDto();
                ncrDto.setCommonCodeId(201);
                ncrDto.setReceivingMemberId(e.getUserId());
                ncrDto.setLink("https://");
                ncrDto.setDamjjokName(damjjokName);
                ncrDto.setGroupName(groupEntity.getGroupName());

                notificationService.create(ncrDto);
            }

        });

        return ChallengeCreateResponseDto.success();
    }

    @Override
    @Transactional
    public ResponseEntity<? super ChallengeProfileImageResponseDto> profileImages() {
        List<ImageDto> list = new ArrayList<>();

        for (int i = 1; i <= 4 ; i++) {
            ImageEntity entity = imageRespository.findByImageId(i);

            if(entity == null){
                throw new CustomException(HttpStatus.NOT_FOUND, ResponseCode.NOT_FOUND, i + "<- 해당 id의 이미지가 없네요.디비 확인해주세요");
            }

            ImageDto dto = new ImageDto();
            dto.setImageId(entity.getImageId());
            dto.setImagePath(entity.getImagePath());
            list.add(dto);
        }

        return ChallengeProfileImageResponseDto.success(list);
    }

    @Override
    @Transactional
    public ResponseEntity<? super ChallengeListByGroupIdResponseDto> challengeList(int groupId) {
        List<ChallengeDto> list = new ArrayList<>();

        List<ChallengeEntity> entityList = challengeRepository.findByGroupEntityGroupId(groupId);


        entityList.stream().forEach(e -> {
            ChallengeDto dto = new ChallengeDto();
            dto.setChallengeId(e.getChallengeId());
            dto.setGroupId(e.getGroupEntity().getGroupId());
            dto.setUserId(e.getUserId());

            UserEntity userEntity = userRepository.findByUserId(e.getUserId());
            if(userEntity == null) throw new UserNotFoundException();

            dto.setUserName(userEntity.getUserName());
            dto.setDuration(e.getDuration());
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
        //담쪽이 이름순으로 정렬
        list.sort(Comparator.comparing(ChallengeDto::getUserName));

        return ChallengeListByGroupIdResponseDto.success(list);
    }

    @Override
    @Transactional
    public ResponseEntity<? super ChallengeDetailResponseDto> challengeDetail(int challengeId) {
        ChallengeDto dto;

        ChallengeEntity entity = challengeRepository.findByChallengeId(challengeId);
        if(entity == null) throw new ChallengeNotFoundException();

        dto = new ChallengeDto(entity);
        UserEntity userEntity = userRepository.findByUserId(entity.getUserId());
        if( userEntity == null ) throw new UserNotFoundException();

        dto.setUserName(userEntity.getUserName());

        return ChallengeDetailResponseDto.success(dto);
    }

    @Override
    @Transactional
    public ResponseEntity<? super ChallengeMemberListResponseDto> challengeMemberList(int challengeId) {
        List<ChallengeMemeberDto> list = new ArrayList<>();

        List<ChallengeMemberEntity> entityList = challengeMemeberRepository.findByChallengeEntityChallengeId(challengeId);

        entityList.stream().forEach(e -> {
            ChallengeMemeberDto dto = new ChallengeMemeberDto(e);
            UserEntity userEntity = e.getUserEntity();
            dto.setUserName(userEntity.getUserName());
            list.add(dto);
        });

        return ChallengeMemberListResponseDto.success(list);
    }

    @Override
    @Transactional
    public ResponseEntity<? super ChallengeChangeStatusResponseDto> changeStatus(ChallengeChangeStatusRequestDto dto) {

        ChallengeEntity entity = challengeRepository.findByChallengeId(dto.getChallengeId());
        if(entity == null) throw new ChallengeNotFoundException();

        if(dto.getStatus().equals("FAIL")) entity.setEndDate(LocalDateTime.now());
        entity.setStatus(dto.getStatus());

        challengeRepository.save(entity);

        return ChallengeChangeStatusResponseDto.success();
    }

    @Override
    @Transactional
    public ResponseEntity<? super ChallengeProfileModifyResponseDto> modifyProfile(int challengeId, ChallengeProfileModifyRequestDto dto) {

        ChallengeEntity entity = challengeRepository.findByChallengeId(challengeId);
        if(entity == null) throw new ChallengeNotFoundException();

        entity.setDetermination(dto.getDetermination());
        entity.setProfilePath(dto.getImagePath());

        challengeRepository.save(entity);

        return ChallengeProfileModifyResponseDto.success();
    }

    @Override
    @Transactional
    public ResponseEntity<? super ChallengeRankResponseDto> challengeRank(ChallengeRankRequestDto dto) {
        int ranking;

        ChallengeEntity cur = challengeRepository.findByChallengeId(dto.getChallengeId());
        if(cur == null) throw new ChallengeNotFoundException();
        List<ChallengeEntity> list = challengeRepository.findAll();

        AtomicInteger count = new AtomicInteger();
        int cur_day = (int) ChronoUnit.DAYS.between(cur.getCreatedAt().toLocalDate() , LocalDateTime.now());

        Set<Integer> peroidSet = new TreeSet<>();

        list.stream().forEach(challenge-> {
            if(challenge.getStatus().equals("PROGRESS")){
                int nxt_day = (int) ChronoUnit.DAYS.between(challenge.getCreatedAt().toLocalDate() , LocalDateTime.now());
                peroidSet.add(nxt_day);
            }
        });

        int rank = 0;
        for(Integer r : peroidSet){
            rank++;
            if(r == cur_day){
                break;
            }
        }

        ranking = (int)((double)rank / peroidSet.size() * 100);

        return ChallengeRankResponseDto.success(100 - ranking);
    }

    @Override
    @Transactional
    public ResponseEntity<? super ChallengeSavedMoneyResponseDto> challengeSavedMoney(int challengeId) {

        int returnMoney = 0;
        int endMoney = 0;

        ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);
        if(challengeEntity == null) throw new ChallengeNotFoundException();

        // 계산
        int initialMoney = challengeEntity.getInitialMoney();
        int savedMoney = challengeEntity.getSavedMoney();
        int period = (int) ChronoUnit.DAYS.between(challengeEntity.getCreatedAt().toLocalDate() , LocalDateTime.now());
        int period2 = (int) ChronoUnit.DAYS.between(challengeEntity.getCreatedAt().toLocalDate() , challengeEntity.getEndDate().toLocalDate());
        int sp = challengeEntity.getSavedPeriod();

        returnMoney = initialMoney + savedMoney * (period/sp);
        endMoney = initialMoney + savedMoney * (period2 / sp);


        return ChallengeSavedMoneyResponseDto.success(returnMoney,endMoney);
    }
}
