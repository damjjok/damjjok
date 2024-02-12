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
import com.ssafy.server.exception.ChallengeNotFoundException;
import com.ssafy.server.exception.CustomAuthenticationException;
import com.ssafy.server.exception.UserNotFoundException;
import com.ssafy.server.repository.AttendanceRepository;
import com.ssafy.server.repository.ChallengeRepository;
import com.ssafy.server.repository.UserRepository;
import com.ssafy.server.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.http.HttpStatus;
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
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null || !(authentication.getPrincipal() instanceof CustomUserDetails)){
            throw new CustomAuthenticationException("인증 정보가 없어요", HttpStatus.UNAUTHORIZED);
        }
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        int challengeId = dto.getChallengeId();
        int userId = customUserDetails.getUserId();

        System.out.println(challengeId);
        System.out.println(userId);

        UserEntity userEntity = userRepository.findByUserId(userId);
        if (userEntity == null) {
            throw new UserNotFoundException();
        }

        ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);
        if (challengeEntity == null) {
            throw new ChallengeNotFoundException();
        }

        //이미 출석을 했을 때
        AttendanceEntity today = attendanceRepository.findByToday(LocalDateTime.now(), userId, challengeId);
        System.out.println(today);
        if(today != null) return ResponseDto.validationFail();

        AttendanceEntity attendanceEntity = new AttendanceEntity();
        attendanceEntity.setChallengeEntity(challengeEntity);
        attendanceEntity.setUserEntity(userEntity);


        attendanceRepository.save(attendanceEntity);
        return AttendanceCreateResponseDto.success();
    }

    @Override
    public ResponseEntity<? super AttendanceListResponseDto> list(AttedanceListRquestDto dto) {
        List<LocalDateTime> list = new ArrayList<>();

        int challengeId = dto.getChallengeId();

        ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);
        if (challengeEntity == null) {
            throw new UserNotFoundException();
        }

        List<AttendanceEntity> attendanceEntities = attendanceRepository.findByChallengeEntity(challengeEntity);
        attendanceEntities.stream().forEach(e ->{
            list.add(e.getAttendanceDate());
        });

        return AttendanceListResponseDto.success(list);
    }
}
