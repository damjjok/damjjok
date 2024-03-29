package com.ssafy.server.service.implement;

import com.ssafy.server.common.ResponseCode;
import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.auth.CustomUserDetails;
import com.ssafy.server.dto.request.notification.NotificationCreateRequestDto;
import com.ssafy.server.dto.request.schedule.ScheduleCreateRequestDto;
import com.ssafy.server.dto.request.schedule.ScheduleDetailRequestDto;
import com.ssafy.server.dto.response.schedule.ScheduleCreateResponseDto;
import com.ssafy.server.dto.response.schedule.ScheduleDetailResponseDto;
import com.ssafy.server.dto.schedule.ScheduleDto;
import com.ssafy.server.entity.ChallengeEntity;
import com.ssafy.server.entity.GroupEntity;
import com.ssafy.server.entity.ScheduleEntity;
import com.ssafy.server.entity.UserEntity;
import com.ssafy.server.exception.ChallengeNotFoundException;
import com.ssafy.server.exception.CustomAuthenticationException;
import com.ssafy.server.exception.CustomException;
import com.ssafy.server.exception.GroupNotFoundException;
import com.ssafy.server.repository.*;
import com.ssafy.server.service.NotificationService;
import com.ssafy.server.service.ScheduleService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final ChallengeRepository challengeRepository;
    private final EvidenceRepository evidenceRepository;
    private final TestimonyRepository testimonyRepository;

    private final GroupRepository groupRepository;
    private final GroupMemberRepository groupMemberRepository;
    private final NotificationService notificationService;

    //Optional로 일정이 없는 경우에도 에러가 아닌 null 값이라는 걸 클라이언트에게 전달함
    @Override
    @Transactional
    public ResponseEntity<? super Optional<ScheduleDetailResponseDto>> getSchedule(ScheduleDetailRequestDto dto) {
        int challengeId = dto.getChallengeId();
        ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);
        if (challengeEntity == null) {
            throw new ChallengeNotFoundException();
        }
        Optional<ScheduleEntity> optionalSchedule = scheduleRepository.findByChallengeEntityAndEndDateFalse(challengeEntity);
        if (optionalSchedule.isPresent()) {
            ScheduleEntity scheduleEntity = optionalSchedule.get();
            ScheduleDto scheduleDto = convertToDto(scheduleEntity);
            return ResponseEntity.ok(Optional.of(scheduleDto));
        } else {
            return ResponseEntity.ok(Optional.empty());
        }
    }

    @Override
    @Transactional
    public ResponseEntity<? super ScheduleCreateResponseDto> createSchedule(ScheduleCreateRequestDto requestDto) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null || !(authentication.getPrincipal() instanceof CustomUserDetails)){
            throw new CustomAuthenticationException("사용자 인증 다시 해주세요.");
        }
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        // 챌린지 관련 데이터를 가져오는 부분
        int challengeId = requestDto.getChallengeId();
        ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);
        if (challengeEntity == null) {
            throw new ChallengeNotFoundException();
        }
        int damjjokId = challengeEntity.getUserId(); //담쪽이id
        String damjjokName = customUserDetails.getUserName();

        // 챌린지 종료일 3일 전보다 이후인지 확인하는 로직
         if (requestDto.getDate().isAfter(challengeEntity.getEndDate().minusDays(3))) {
             throw new CustomException(HttpStatus.BAD_REQUEST, ResponseCode.BAD_REQUEST, "챌린지 종료일로부터 3일전으로 일정을 잡아주세요.");
         }

        // 마지막 진실의 방 이후로 증언이나 증거가 1개도 없다면 예외 처리
        LocalDateTime lastTruthRoomDate = challengeEntity.getFinalTruthRoomDate();
        boolean hasEvidenceAfterLastTruthRoom = evidenceRepository.existsByChallengeEntityAndCreatedAtAfter(challengeEntity, lastTruthRoomDate);
        boolean hasTestimonyAfterLastTruthRoom = testimonyRepository.existsByChallengeEntityAndCreatedAtAfter(challengeEntity, lastTruthRoomDate);
        if (!hasEvidenceAfterLastTruthRoom && !hasTestimonyAfterLastTruthRoom) {
            throw new CustomException(HttpStatus.BAD_REQUEST, ResponseCode.BAD_REQUEST, "마지막 진실의 방 날짜 이후로 증거나 증언이 1개도 없습니다.");
        }

         //담쪽이가 아닌 경우 "VF"
         if(customUserDetails.getUserId() != damjjokId) {
             throw new CustomException(HttpStatus.BAD_REQUEST, ResponseCode.BAD_REQUEST, "담쪽이만 일정을 설정할 수 있습니다.");
         }

        ScheduleEntity newSchedule = new ScheduleEntity();
        newSchedule.setChallengeEntity(challengeEntity);
        newSchedule.setDate(requestDto.getDate());
        newSchedule.setEndDate(false); // 기본값으로 false 설정
        newSchedule.setCreatedBy(challengeId);
        newSchedule.setCreatedAt(LocalDateTime.now()); // 현재 시간 설정

        scheduleRepository.save(newSchedule);

        // 알림 보내기 - 일정을 잡았음
        int groupId = challengeEntity.getGroupEntity().getGroupId();
        GroupEntity groupEntity = groupRepository.findByGroupId(groupId);
        if(groupEntity == null) {
            throw new GroupNotFoundException();
        }

        List<UserEntity> userEntityList = groupMemberRepository.findUsersByGroupId(groupId);
        userEntityList.stream()
                .filter(user -> user.getUserId() != damjjokId)
                .forEach(user -> {
                    NotificationCreateRequestDto ncrDto = new NotificationCreateRequestDto();
                    ncrDto.setCommonCodeId(602);
                    ncrDto.setReceivingMemberId(user.getUserId());
                    ncrDto.setDamjjokName(damjjokName);
                    ncrDto.setLink("https://");
                    ncrDto.setGroupName(groupEntity.getGroupName());

                    notificationService.create(ncrDto);
                });
        return ScheduleCreateResponseDto.success();

    }

    private ScheduleDto convertToDto(ScheduleEntity scheduleEntity) {
        if (scheduleEntity == null) {
            return null;
        }

        ScheduleDto scheduleDto = new ScheduleDto();
        scheduleDto.setScheduleId(scheduleEntity.getScheduleId());
        scheduleDto.setChallengeId(scheduleEntity.getChallengeEntity() != null ? scheduleEntity.getChallengeEntity().getChallengeId() : null);
        scheduleDto.setDate(scheduleEntity.getDate());
        scheduleDto.setEndDate(scheduleEntity.getEndDate());
        scheduleDto.setCreatedBy(scheduleEntity.getCreatedBy());
        scheduleDto.setCreatedAt(scheduleEntity.getCreatedAt());

        return scheduleDto;
    }
}

