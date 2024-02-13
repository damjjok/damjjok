package com.ssafy.server.service.implement;

import com.ssafy.server.common.ResponseCode;
import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.auth.CustomUserDetails;
import com.ssafy.server.dto.proof.TestimonyDto;
import com.ssafy.server.dto.request.notification.NotificationCreateRequestDto;
import com.ssafy.server.dto.request.proof.*;
import com.ssafy.server.dto.response.proof.*;
import com.ssafy.server.entity.*;
import com.ssafy.server.exception.*;
import com.ssafy.server.provider.JwtProvider;
import com.ssafy.server.repository.*;
import com.ssafy.server.service.NotificationService;
import com.ssafy.server.service.TestimonyService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class TestimonyServiceImpl implements TestimonyService {

    private final TestimonyRepository testimonyRepository;
    private final ChallengeRepository challengeRepository;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final GroupMemberRepository groupMemberRepository;

    private final NotificationService notificationService;

    @Override
    @Transactional
    public ResponseEntity<? super TestimonyCreateResponseDto> create(TestimonyCreateRequestDto dto){
        String title = dto.getTitle();
        String content = dto.getContent();
        int challengeId = dto.getChallengeId();

        ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);
        if(challengeEntity == null) {
            throw new ChallengeNotFoundException();
        }

        TestimonyEntity testimonyEntity = new TestimonyEntity();
        testimonyEntity.setChallengeEntity(challengeEntity);
        testimonyEntity.setTestimonyTitle(title);
        testimonyEntity.setTestimonyContent(content);

        // TODO : 여기 나중에 유저정보 받아와서 넣어줘야함
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null || !(authentication.getPrincipal() instanceof CustomUserDetails)){
            throw new CustomAuthenticationException("사용자 인증 다시 해주세요.");
        }
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        int userId = customUserDetails.getUserId();

        testimonyEntity.setCreatedBy(userId);
        testimonyEntity.setUpdatedBy(userId);

        testimonyRepository.save(testimonyEntity);

        // 챌린지 멤버한테 모두 알림 쏘기
        int groupId = challengeEntity.getGroupEntity().getGroupId();
        GroupEntity groupEntity = groupRepository.findByGroupId(groupId);
        if (groupEntity == null) {
            throw new GroupNotFoundException();
        }

        List<UserEntity> userEntityList = groupMemberRepository.findUsersByGroupId(groupId);
        userEntityList.stream().forEach(user -> {
            NotificationCreateRequestDto ncrDto = new NotificationCreateRequestDto();
            ncrDto.setCommonCodeId(501);
            ncrDto.setReceivingMemberId(user.getUserId());
            ncrDto.setSenderName(user.getUserName());
            ncrDto.setLink("https://");
            ncrDto.setGroupName(groupEntity.getGroupName());

            notificationService.create(ncrDto);
        });

        return TestimonyCreateResponseDto.success();
    }

    @Override
    @Transactional
    public ResponseEntity<? super TestimonyListResponseDto> list(TestimonyListRequestDto dto) {

    List<TestimonyDto> list = new ArrayList<>();
        int challengeId = dto.getChallengeId();

        ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);
        if (challengeEntity == null) {
            throw new ChallengeNotFoundException();
        }
        // createdAt 기준으로 내림차순 정렬
        Sort sort = Sort.by("createdAt").descending();
        List<TestimonyEntity> entityList = testimonyRepository.findByChallengeEntity(challengeEntity, sort);

        entityList.stream().forEach((e) -> {
            TestimonyDto testimonyDto = new TestimonyDto();
            testimonyDto.setTestimonyId(e.getTestimonyId());
            testimonyDto.setTestimonyTitle(e.getTestimonyTitle());
            testimonyDto.setTestimonyContent(e.getTestimonyContent());
            testimonyDto.setCreatedAt(e.getCreatedAt());
            testimonyDto.setCreatedBy(e.getCreatedBy());
            testimonyDto.setUpdatedAt(e.getUpdatedAt());
            testimonyDto.setUpdatedBy(e.getUpdatedBy());

            UserEntity userEntity = userRepository.findByUserId(e.getCreatedBy());
            if (userEntity == null) {
                throw new UserNotFoundException();
            }
            testimonyDto.setUserName(userEntity.getUserName());

            list.add(testimonyDto);
        });

        return TestimonyListResponseDto.success(list);
    }

    @Override
    @Transactional
    public ResponseEntity<? super TestimonyDetailResponseDto> detail(TestimonyDetailRequestDto dto) {

    TestimonyDto testimony = null;
        int testimonyId = dto.getTestimonyId();

        TestimonyEntity e = testimonyRepository.findByTestimonyId(testimonyId);
        if (e == null) {
            throw new CustomException(HttpStatus.BAD_REQUEST, ResponseCode.BAD_REQUEST, testimonyId + "없는 증언 Id 입니다.");
        }
        testimony = new TestimonyDto();
        testimony.setTestimonyId(e.getTestimonyId());
        testimony.setTestimonyTitle(e.getTestimonyTitle());
        testimony.setTestimonyContent(e.getTestimonyContent());
        testimony.setCreatedAt(e.getCreatedAt());
        testimony.setCreatedBy(e.getCreatedBy());
        testimony.setUpdatedAt(e.getUpdatedAt());
        testimony.setUpdatedBy(e.getUpdatedBy());
        UserEntity userEntity = userRepository.findByUserId(e.getCreatedBy());
        if (userEntity == null) {
            throw new UserNotFoundException();
        }
        testimony.setUserName(userEntity.getUserName());

    return TestimonyDetailResponseDto.success(testimony);
    }

    @Override
    @Transactional
    public ResponseEntity<? super TestimonyModifyResponseDto> modify(TestimonyModifyRequestDto dto) {
        int testimonyId = dto.getTestimonyId();
        String title = dto.getTitle();
        String content = dto.getContent();


        TestimonyEntity testimonyEntity = testimonyRepository.findByTestimonyId(testimonyId);
        if (testimonyEntity == null) {
            throw new CustomException(HttpStatus.BAD_REQUEST, ResponseCode.BAD_REQUEST, testimonyId + "없는 증언 Id 입니다.");
        }
        testimonyEntity.setTestimonyId(testimonyId);
        testimonyEntity.setTestimonyTitle(title);
        testimonyEntity.setTestimonyContent(content);
        testimonyEntity.setUpdatedAt(LocalDateTime.now());

        testimonyRepository.save(testimonyEntity);
        return TestimonyModifyResponseDto.success();
    }

    @Override
    @Transactional
    public ResponseEntity<? super TestimonyForTruthRoomResponseDto> listForTruthRoom(TestimonyForTruthRoomRequestDto dto) {
        List<TestimonyDto> list = new ArrayList<>();
        int challengeId = dto.getChallengeId();

        ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);
        if (challengeEntity == null) {
            throw new ChallengeNotFoundException();
        }
        // createdAt 기준으로 내림차순 정렬
        Sort sort = Sort.by("createdAt").descending();
        List<TestimonyEntity> entityList = testimonyRepository.findByChallengeEntity(challengeEntity, sort);

        entityList.stream().forEach((e) -> {
            if(e.getCreatedAt().isBefore(challengeEntity.getFinalTruthRoomDate())) return;
            TestimonyDto testimonyDto = new TestimonyDto();
            testimonyDto.setTestimonyId(e.getTestimonyId());
            testimonyDto.setTestimonyTitle(e.getTestimonyTitle());
            testimonyDto.setTestimonyContent(e.getTestimonyContent());
            testimonyDto.setCreatedAt(e.getCreatedAt());
            testimonyDto.setCreatedBy(e.getCreatedBy());
            testimonyDto.setUpdatedAt(e.getUpdatedAt());
            testimonyDto.setUpdatedBy(e.getUpdatedBy());

            UserEntity userEntity = userRepository.findByUserId(e.getCreatedBy());
            if (userEntity == null) {
                throw new UserNotFoundException();
            }
            testimonyDto.setUserName(userEntity.getUserName());

            list.add(testimonyDto);
        });

        if(list.isEmpty()) {
            throw new CustomException(HttpStatus.BAD_REQUEST, ResponseCode.BAD_REQUEST, "진실의 방 이후로 생성된 증거나 증언이 없습니다.");
        }
        return TestimonyForTruthRoomResponseDto.success(list);
    }


}
