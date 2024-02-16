package com.ssafy.server.service.implement;

import com.ssafy.server.dto.request.notification.NotificationCreateRequestDto;
import com.ssafy.server.dto.response.schedule.ScheduleDetailResponseDto;
import com.ssafy.server.entity.*;
import com.ssafy.server.exception.ChallengeNotFoundException;
import com.ssafy.server.exception.GroupNotFoundException;
import com.ssafy.server.exception.UserNotFoundException;
import com.ssafy.server.repository.*;
import com.ssafy.server.service.FCMAlarmService;
import com.ssafy.server.service.NotificationService;
import com.ssafy.server.service.SchedulerService;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.PersistenceContext;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Period;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SchedulerServiceImpl implements SchedulerService {

    @PersistenceContext
    private EntityManager entityManager;

    private final UserRepository userRepository;
    private final ChallengeRepository challengeRepository;
    private final GroupMemberRepository groupMemberRepository;
    private final NotificationService notificationService;
    private final GroupRepository groupRepository;
    private final EvidenceRepository evidenceRepository;


    @Scheduled(cron = "0 * * * * ?")
    @Override
    @Transactional
    public void testCheckSchedule() {
        LocalDateTime now = LocalDateTime.now();
        System.out.println(now);

// 오늘 날짜를 지나면서 아직 종료되지 않은 모든 일정을 찾음
        List<ScheduleEntity> schedules = entityManager.createQuery(
                        "SELECT s FROM ScheduleEntity s WHERE s.date < CURRENT_DATE AND s.endDate = false",
                        ScheduleEntity.class)
                .getResultList();

        // 해당 일정들의 endDate를 true로 설정하여 종료 상태로 변경
        for (ScheduleEntity schedule : schedules) {
            schedule.setEndDate(true);
            entityManager.merge(schedule);
            // 연관된 챌린지의 마지막 진실의 방 종료일을 오늘 날짜로 업데이트
            ChallengeEntity challengeEntity = schedule.getChallengeEntity();
            if (challengeEntity == null) {
                throw new ChallengeNotFoundException();
            }
            challengeEntity.setFinalTruthRoomDate(now);
            entityManager.merge(challengeEntity);
        }
    }

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
            if (challengeEntity == null) {
                throw new ChallengeNotFoundException();
            }
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
        - (서현 추가함) 일정 잡아달라는 알림 -> 담쪽이에 에게만
         */

        LocalDateTime todayStart = LocalDate.now().atStartOfDay();
        LocalDateTime todayEnd = todayStart.plusDays(1).minusSeconds(1);
        // 1 그룹 종료 알림
        List<GroupEntity> groups = entityManager.createQuery(
                        "SELECT g FROM GroupEntity g WHERE g.endDate >= :todayStart AND g.endDate <= :todayEnd",
                        GroupEntity.class)
                .setParameter("todayStart", todayStart)
                .setParameter("todayEnd", todayEnd)
                .getResultList();

        groups.stream().forEach( group -> {
            // 해당 그룹의 멤버에게 알림 전송
            List<UserEntity> userEntityList = groupMemberRepository.findUsersByGroupId(group.getGroupId());
            userEntityList.stream().forEach( user -> {
                if(user.getFcmToken() != null) {
                    NotificationCreateRequestDto dto = new NotificationCreateRequestDto();
                    GroupEntity groupEntity = groupRepository.findByGroupId(group.getGroupId());
                    if(groupEntity == null) {
                        throw new GroupNotFoundException();
                    }
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
                        "SELECT c FROM ChallengeEntity c WHERE c.endDate >= :todayStart AND c.endDate <= :todayEnd",
                        ChallengeEntity.class)
                .setParameter("todayStart", todayStart)
                .setParameter("todayEnd", todayEnd)
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
                        if(groupEntity == null) {
                            throw new GroupNotFoundException();
                        }
                        dto.setGroupName(groupEntity.getGroupName());
                        dto.setReceivingMemberId(user.getUserId());
                        dto.setCommonCodeId(303);
                        UserEntity userEntity = userRepository.findByUserId(challenge.getUserId());
                        if (userEntity == null) {
                            throw new UserNotFoundException();
                        }
                        dto.setDamjjokName(userEntity.getUserName());
                        notificationService.create(dto);
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
                if (user == null) {
                    throw new UserNotFoundException();
                }

                Period period = Period.between(challenge.getCreatedAt().toLocalDate(), challenge.getEndDate().toLocalDate());

                if(user.getFcmToken() != null) {
                    NotificationCreateRequestDto dto = new NotificationCreateRequestDto();
                    GroupEntity groupEntity = groupRepository.findByGroupId(challenge.getGroupEntity().getGroupId());
                    if (groupEntity == null) {
                        throw new GroupNotFoundException();
                    }
                    dto.setGroupName(groupEntity.getGroupName());
                    dto.setReceivingMemberId(user.getUserId());
                    dto.setCommonCodeId(401);
                    UserEntity userEntity = userRepository.findByUserId(challenge.getUserId());
                    if(userEntity == null) {
                        throw new UserNotFoundException();
                    }
                    dto.setDamjjokName(userEntity.getUserName());
                    LocalDateTime challengeCreatedAt = challenge.getCreatedAt();
                    LocalDateTime today = LocalDateTime.now();
                    long daysBetween = ChronoUnit.DAYS.between(challengeCreatedAt.toLocalDate(), today.toLocalDate());
                    dto.setDay(Long.toString(daysBetween));
                    notificationService.create(dto);
                }
            }
        });

        // 챌린지가 3일 뒤에 종료되는 경우에 대한 알림
        LocalDateTime inThreeDaysStart = LocalDate.now().plusDays(3).atStartOfDay();
        LocalDateTime inThreeDaysEnd = inThreeDaysStart.plusDays(1).minusSeconds(1);

        List<ChallengeEntity> exactThreeDaysToEndChallenges = entityManager.createQuery(
                        "SELECT c FROM ChallengeEntity c WHERE c.endDate >= :inThreeDaysStart AND c.endDate < :inThreeDaysEnd",
                        ChallengeEntity.class)
                .setParameter("inThreeDaysStart", inThreeDaysStart)
                .setParameter("inThreeDaysEnd", inThreeDaysEnd)
                .getResultList();


        exactThreeDaysToEndChallenges.forEach(challenge -> {
            GroupEntity groupEntity = challenge.getGroupEntity();
            if (groupEntity == null) {
                throw new GroupNotFoundException();
            }
            // 챌린지와 연관된 그룹의 모든 멤버에게 알림 전송
            List<UserEntity> userEntityList = groupMemberRepository.findUsersByGroupId(groupEntity.getGroupId());
            userEntityList.forEach(user -> {
                if (user.getFcmToken() != null) {
                    NotificationCreateRequestDto dto = new NotificationCreateRequestDto();
                    dto.setCommonCodeId(301);
                    dto.setReceivingMemberId(user.getUserId());
                    dto.setGroupName(groupEntity.getGroupName());
                    dto.setDamjjokName(user.getUserName());
                    notificationService.create(dto);
                }
            });
        });

        // 그룹이 7일 뒤에 종료되는 경우에 대한 알림
        LocalDateTime inSevenDaysStart = LocalDate.now().plusDays(7).atStartOfDay();
        LocalDateTime inSevenDaysEnd = inSevenDaysStart.plusDays(1).minusSeconds(1);

        List<GroupEntity> exactSevenDaysToEndGroups = entityManager.createQuery(
                        "SELECT g FROM GroupEntity g WHERE g.endDate >= :inSevenDaysStart AND g.endDate < :inSevenDaysEnd",
                        GroupEntity.class)
                .setParameter("inSevenDaysStart", inSevenDaysStart)
                .setParameter("inSevenDaysEnd", inSevenDaysEnd)
                .getResultList();

        exactSevenDaysToEndGroups.forEach(group -> {
            // 그룹의 모든 멤버에게 알림 전송
            List<UserEntity> userEntityList = groupMemberRepository.findUsersByGroupId(group.getGroupId());
            userEntityList.forEach(user -> {
                if (user.getFcmToken() != null) {
                    NotificationCreateRequestDto dto = new NotificationCreateRequestDto();
                    dto.setCommonCodeId(302);
                    dto.setReceivingMemberId(user.getUserId());
                    dto.setGroupName(group.getGroupName());
                    notificationService.create(dto);
                }
            });
        });

        LocalDate today = now.toLocalDate();
        todayStart = LocalDateTime.of(today, LocalTime.MIN);
        todayEnd = LocalDateTime.of(today, LocalTime.MAX);

        List<ScheduleEntity> todaysSchedules = entityManager.createQuery(
                        "SELECT s FROM ScheduleEntity s WHERE s.date >= :todayStart AND s.date <= :todayEnd",
                        ScheduleEntity.class)
                .setParameter("todayStart", todayStart)
                .setParameter("todayEnd", todayEnd)
                .getResultList();

        todaysSchedules.forEach(schedule -> {
            ChallengeEntity challenge = schedule.getChallengeEntity();
            GroupEntity group = challenge.getGroupEntity();
            if (group == null) {
                throw new GroupNotFoundException();
            }
            UserEntity createdByUser = userRepository.findByUserId(schedule.getCreatedBy());
            if(createdByUser == null) {
                throw new UserNotFoundException();
            }

            List<UserEntity> groupMembers = groupMemberRepository.findUsersByGroupId(group.getGroupId());
            groupMembers.forEach(member -> {
                if (member.getFcmToken() != null) {
                    NotificationCreateRequestDto notificationDto = new NotificationCreateRequestDto();
                    notificationDto.setReceivingMemberId(member.getUserId());
                    notificationDto.setCommonCodeId(603);
                    notificationDto.setGroupName(group.getGroupName());
                    notificationDto.setDamjjokName(createdByUser.getUserName());
                    notificationService.create(notificationDto);
                }
            });
        });

        // 진실의 방 일정 잡아달라

        List<ChallengeEntity> challenges = entityManager.createQuery(
                        "SELECT c FROM ChallengeEntity c WHERE c.finalTruthRoomDate < :now AND c.status = :status",
                        ChallengeEntity.class)
                .setParameter("now", now)
                .setParameter("status", "PROGRESS")
                .getResultList();

        challenges.stream().forEach(challenge -> {
            List<EvidenceEntity> elist = evidenceRepository.findByChallengeEntity
                    (challenge, Sort.by("created_at").ascending());

            if(elist.get(elist.size() - 1).getCreatedAt().isAfter(challenge.getFinalTruthRoomDate())){

                GroupEntity g = groupRepository.findByGroupId(challenge.getGroupEntity().getGroupId());
                if (g == null) {
                    throw new GroupNotFoundException();
                }
                UserEntity u = userRepository.findByUserId(challenge.getUserId());
                if(u == null) {
                    throw new UserNotFoundException();
                }

                NotificationCreateRequestDto notificationDto = new NotificationCreateRequestDto();
                notificationDto.setReceivingMemberId(challenge.getUserId());
                notificationDto.setCommonCodeId(601);
                notificationDto.setGroupName(g.getGroupName());
                notificationDto.setDamjjokName(u.getUserName());
                notificationService.create(notificationDto);
            }
        });
    }
}
