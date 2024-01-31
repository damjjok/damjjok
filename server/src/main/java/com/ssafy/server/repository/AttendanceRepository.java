package com.ssafy.server.repository;

import com.ssafy.server.entity.AttendanceEntity;
import com.ssafy.server.entity.ChallengeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<AttendanceEntity, Integer> {
    @Query(value = "SELECT * FROM attendance A WHERE A.created_by = :user AND A.challenge_id = :challenge AND YEAR(attendance_date) = YEAR(:today) AND MONTH(attendance_date) = MONTH(:today) AND DAY(attendance_date) = DAY(:today)", nativeQuery = true)
    AttendanceEntity findByToday(@Param("today")LocalDateTime today, @Param("user") int userId, @Param("challenge") int challengeId);

    List<AttendanceEntity> findByChallengeEntity(ChallengeEntity challengeEntity);
}
