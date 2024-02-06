package com.ssafy.server.service.implement;

import com.ssafy.server.dto.response.schedule.ScheduleDetailResponseDto;
import com.ssafy.server.entity.ChallengeEntity;
import com.ssafy.server.entity.ScheduleEntity;
import com.ssafy.server.service.SchedulerService;
import jakarta.persistence.EntityManager;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.PersistenceContext;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class SchedulerServiceImpl implements SchedulerService {

    @PersistenceContext
    private EntityManager entityManager;

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
    }
}
