package com.ssafy.server.service.implement;

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
import com.ssafy.server.repository.GroupMemberRepository;
import com.ssafy.server.repository.GroupRepository;
import com.ssafy.server.repository.ScheduleRepository;
import com.ssafy.server.repository.ChallengeRepository;
import com.ssafy.server.service.NotificationService;
import com.ssafy.server.service.ScheduleService;
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

    private final GroupRepository groupRepository;
    private final GroupMemberRepository groupMemberRepository;
    private final NotificationService notificationService;

    @Override
    public ResponseEntity<? super Optional<ScheduleDetailResponseDto>> getSchedule(ScheduleDetailRequestDto dto) {
        try {
            int challengeId = dto.getChallengeId();
            ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);
            Optional<ScheduleEntity> optionalSchedule = scheduleRepository.findByChallengeEntityAndEndDateFalse(challengeEntity);

            if (optionalSchedule.isPresent()) {
                ScheduleEntity scheduleEntity = optionalSchedule.get();
                ScheduleDto scheduleDto = convertToDto(scheduleEntity);
                return ResponseEntity.ok(Optional.of(scheduleDto));
            } else {
                return ResponseEntity.ok(Optional.empty());
            }
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @Override
    public ResponseEntity<? super ScheduleCreateResponseDto> createSchedule(ScheduleCreateRequestDto requestDto) {

        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

            // 챌린지 관련 데이터를 가져오는 부분
            int challengeId = requestDto.getChallengeId();
            ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);
            int damjjokId = challengeEntity.getUserId(); //담쪽이id

            // 챌린지 종료일 3일 전보다 이후인지 확인하는 로직 (가정)
             if (requestDto.getDate().isAfter(challengeEntity.getEndDate().minusDays(3))) {
                 return ScheduleCreateResponseDto.wrongDate();
             }

             //담쪽이가 아닌 경우 "VF"
             if(customUserDetails.getUserId() != damjjokId) {
                 return ScheduleCreateResponseDto.notDomjjok();
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

            List<UserEntity> userEntityList = groupMemberRepository.findUsersByGroupId(groupId);
            userEntityList.stream()
                    .filter(user -> user.getUserId() != damjjokId)
                    .forEach(user -> {
                        NotificationCreateRequestDto ncrDto = new NotificationCreateRequestDto();
                        ncrDto.setCommonCodeId(602);
                        ncrDto.setReceivingMemberId(user.getUserId());
                        ncrDto.setLink("https://");
                        ncrDto.setGroupName(groupEntity.getGroupName());

                        notificationService.create(ncrDto);
                    });

            //ScheduleCreateResponseDto responseBody = new ScheduleCreateResponseDto();
            return ScheduleCreateResponseDto.success();
        }catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

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

