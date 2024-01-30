package com.ssafy.server.service.implement;

import com.ssafy.server.dto.request.ScheduleCreateRequestDto;
import com.ssafy.server.dto.request.ScheduleDetailRequestDto;
import com.ssafy.server.dto.response.ScheduleCreateResponseDto;
import com.ssafy.server.dto.schedule.ScheduleDto;
import com.ssafy.server.entity.ScheduleEntity;
import com.ssafy.server.repository.ScheduleRepository;
import com.ssafy.server.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ScheduleServiceImpl implements ScheduleService {
    @Autowired
    private ScheduleRepository scheduleRepository;

    @Override
    public ResponseEntity<? super Optional<ScheduleDto>> getSchedule(ScheduleDetailRequestDto dto) {
        try {
            Optional<ScheduleEntity> optionalSchedule = scheduleRepository.findByChallengeIdAndEndDateFalse(dto.getChallengeId());

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
            // 챌린지 관련 데이터를 가져오는 부분
            // ChallengeDto challengeDto = challengeService.getChallenge(requestDto.getChallengeId());

            // 챌린지 종료일 3일 전보다 이후인지 확인하는 로직 (가정)
            // if (requestDto.getDate().isAfter(challengeDto.getEndDate().minusDays(3))) {
            //     return ResponseEntity
            //         .badRequest()
            //         .body(new ScheduleCreateResponseDto("일정은 챌린지 종료일 3일 전까지만 생성 가능합니다."));
            // }


            ScheduleEntity newSchedule = new ScheduleEntity();
            //newSchedule.setChallengeId(챌린지 엔티티 설정);
            newSchedule.setDate(requestDto.getDate());
            newSchedule.setEndDate(false); // 기본값으로 false 설정
            //newSchedule.setCreatedBy(챌린지 생성자 ID 설정);
            newSchedule.setCreatedAt(LocalDateTime.now()); // 현재 시간 설정

            scheduleRepository.save(newSchedule);

            ScheduleCreateResponseDto responseBody = new ScheduleCreateResponseDto();
            return ResponseEntity.status(HttpStatus.CREATED).body(responseBody);
        }catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
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

