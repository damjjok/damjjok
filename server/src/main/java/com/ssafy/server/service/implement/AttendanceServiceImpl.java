package com.ssafy.server.service.implement;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.auth.CustomUserDetails;
import com.ssafy.server.dto.request.attendance.AttedanceListRquestDto;
import com.ssafy.server.dto.request.attendance.AttendanceCreateRequestDto;
import com.ssafy.server.dto.response.attendance.AttendanceCreateResponseDto;
import com.ssafy.server.dto.response.attendance.AttendanceListResponseDto;
import com.ssafy.server.entity.AttendanceEntity;
import com.ssafy.server.entity.ChallengeEntity;
import com.ssafy.server.entity.UserEntity;
import com.ssafy.server.repository.AttendanceRepository;
import com.ssafy.server.repository.ChallengeRepository;
import com.ssafy.server.repository.UserRepository;
import com.ssafy.server.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceServiceImpl implements AttendanceService {

    private final UserRepository userRepository;
    private final ChallengeRepository challengeRepository;
    private final AttendanceRepository attendanceRepository;

    @Override
    public ResponseEntity<? super AttendanceCreateResponseDto> create(AttendanceCreateRequestDto dto) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

            int challengeId = dto.getChallengeId();
            int userId = customUserDetails.getUserId();

            System.out.println(challengeId);
            System.out.println(userId);

            UserEntity userEntity = userRepository.findByUserId(userId);
            ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);

            AttendanceEntity today = attendanceRepository.findByToday(LocalDateTime.now(), userId, challengeId);
            System.out.println(today);
            if(today != null) return ResponseDto.validationFail();

            AttendanceEntity attendanceEntity = new AttendanceEntity();
            attendanceEntity.setChallengeEntity(challengeEntity);
            attendanceEntity.setUserEntity(userEntity);


            attendanceRepository.save(attendanceEntity);

        }catch (Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return AttendanceCreateResponseDto.success();
    }

    @Override
    public ResponseEntity<? super AttendanceListResponseDto> list(AttedanceListRquestDto dto) {
        List<LocalDateTime> list = new ArrayList<>();
        try{
            int challengeId = dto.getChallengeId();

            ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);

            List<AttendanceEntity> attendanceEntities = attendanceRepository.findByChallengeEntity(challengeEntity);

            attendanceEntities.stream().forEach(e ->{
                list.add(e.getAttendanceDate());
            });

        }catch (Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return AttendanceListResponseDto.success(list);
    }
}
