package com.ssafy.server.service.implement;

import com.ssafy.server.dto.request.notification.NotificationCreateRequestDto;
import com.ssafy.server.dto.response.schedule.ScheduleDetailResponseDto;
import com.ssafy.server.entity.ChallengeEntity;
import com.ssafy.server.entity.GroupEntity;
import com.ssafy.server.entity.ScheduleEntity;
import com.ssafy.server.entity.UserEntity;
import com.ssafy.server.repository.*;
import com.ssafy.server.service.FCMAlarmService;
import com.ssafy.server.service.NotificationService;
import com.ssafy.server.service.SchedulerService;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.PersistenceContext;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SchedulerServiceImpl implements SchedulerService {

    @PersistenceContext
    private EntityManager entityManager;

    private final FCMAlarmService fcmAlarmService;
    private final UserRepository userRepository;
    private final ChallengeRepository challengeRepository;
    private final GroupMemberRepository groupMemberRepository;
    private final NotificationService notificationService;
    private final GroupRepository groupRepository;

    // 매일 자정에 실행되는 스케줄러
    @Scheduled(cron = "59 59 23 * * ?")
    @Override
    @Transactional
    public void checkSchedule() {
        LocalDateTime now = LocalDateTime.now();

        // 오늘 날짜를 지나면서 아직 종료되지 않은 모든 일정을 찾음
        List<ScheduleEntity> schedules = entityManager.createQuery(
                        "SELECT s FROM ScheduleEntity s WHERE s.date < :now AND s.endDate = false",
                        ScheduleEntity.class)
                .setParameter("now", now)
                .getResultList();

        // 해당 일정들의 endDate를 true로 설정하여 종료 상태로 변경
        for (ScheduleEntity schedule : schedules) {
            schedule.setEndDate(true);
            entityManager.merge(schedule);
            // 연관된 챌린지의 마지막 진실의 방 종료일을 오늘 날짜로 업데이트
            ChallengeEntity challengeEntity = schedule.getChallengeEntity();
            challengeEntity.setFinalTruthRoomDate(now);
            entityManager.merge(challengeEntity);
        }

        /*
        1. 그룹 종료 알림
        2. 챌린지 종료 알림
        3. 챌린지 지속 날짜 알림
        -----
        - 챌린지 3일 뒤에 종료된다는 알림
        - 그룹 3일 뒤에 삭제 된다는 알림
        - 챌린지 지속 날짜 알림
        - 진실의 방 열리는 날
        - 챌린지 종료됬어요 알림
        - 그룹 종료됬어요 ( 마지막 챌린지 종료된 지 + 1달 )이 지나면 바로 종료
         */


        // 1
        List<GroupEntity> groups = entityManager.createQuery(
                        "SELECT g FROM GroupEntity g WHERE g.endDate < :now",
                        GroupEntity.class)
                .setParameter("now", now)
                .getResultList();

        groups.stream().forEach( group -> {
            // 해당 그룹의 멤버에게 알림 전송
            List<UserEntity> userEntityList = groupMemberRepository.findUsersByGroupId(group.getGroupId());
            userEntityList.stream().forEach( user -> {
                if(user.getFcmToken() != null) {
                    NotificationCreateRequestDto dto = new NotificationCreateRequestDto();
                    GroupEntity groupEntity = groupRepository.findByGroupId(group.getGroupId());
                    dto.setGroupName(groupEntity.getGroupName());
                    dto.setReceivingMemberId(user.getUserId());
                    dto.setCommonCodeId(304);
                    notificationService.create(dto);
                }
            });
            //entityManager.remove(group);
        });

        // 2 챌린지 종료
        List<ChallengeEntity> challengeEntityList = entityManager.createQuery(
                        "SELECT g FROM ChallengeEntity g WHERE g.endDate < :now",
                        ChallengeEntity.class)
                .setParameter("now", now)
                .getResultList();

        challengeEntityList.stream()
                .filter( challenge -> challenge.getChallengeId().equals("PROGRESS")) // 해당 챌린지가 진행중이면 밑의 forEach 실행
                .forEach( challenge -> {
                // 해당 그룹의 멤버에게 알림 전송
                List<UserEntity> userEntityList = groupMemberRepository.findUsersByGroupId(challenge.getGroupEntity().getGroupId());
                userEntityList.stream().forEach( user -> {
                    if(user.getFcmToken() != null) {
                        NotificationCreateRequestDto dto = new NotificationCreateRequestDto();
                        GroupEntity groupEntity = groupRepository.findByGroupId(challenge.getGroupEntity().getGroupId());
                        dto.setGroupName(groupEntity.getGroupName());
                        dto.setReceivingMemberId(user.getUserId());
                        dto.setCommonCodeId(303);
                        UserEntity userEntity = userRepository.findByUserId(challenge.getUserId());
                        dto.setDamjjokName(userEntity.getUserName());
                    }

                });
                challenge.setStatus("SUCCESS");
                entityManager.merge(challenge);
            });

        // 3 챌린지 지속 알림
        List<ChallengeEntity> challengeEntityList1 = challengeRepository.findAll();

        challengeEntityList1.stream().forEach(challenge -> {
            if(challenge.getStatus().equals("ON")){
                UserEntity user = userRepository.findByUserId(challenge.getUserId());

                Period period = Period.between(challenge.getCreatedAt().toLocalDate(), challenge.getEndDate().toLocalDate());

                if(user.getFcmToken() != null) fcmAlarmService.sendNotification(user.getFcmToken(), "챌린지 지속일" ,period + "일 지속되고 있음");
            }
        });
    }
}
