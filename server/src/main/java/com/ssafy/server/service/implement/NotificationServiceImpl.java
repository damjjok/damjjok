package com.ssafy.server.service.implement;

import com.ssafy.server.common.ResponseCode;
import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.auth.CustomUserDetails;
import com.ssafy.server.dto.notification.NotificationDto;
import com.ssafy.server.dto.request.notification.NotificationCheckReadRequestDto;
import com.ssafy.server.dto.request.notification.NotificationCreateRequestDto;
import com.ssafy.server.dto.response.notification.NotificationCheckReadResponseDto;
import com.ssafy.server.dto.response.notification.NotificationCreateResponseDto;
import com.ssafy.server.dto.response.notification.NotificationListResponseDto;
import com.ssafy.server.entity.*;
import com.ssafy.server.exception.CustomAuthenticationException;
import com.ssafy.server.exception.CustomException;
import com.ssafy.server.exception.UserNotFoundException;
import com.ssafy.server.repository.*;
import com.ssafy.server.service.FCMAlarmService;
import com.ssafy.server.service.NotificationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final UserRepository userRepository;
    private final ChallengeRepository challengeRepository;
    private final NotificationRepository notificationRepository;
    private final CommonCodeRepository commonCodeRepository;
    private final GroupRepository groupRepository;
    private final NotificationMessageTemplateRepository notificationMessageTemplateRepository;

    private final FCMAlarmService fcmAlarmService;

    @Override
    @Transactional
    public ResponseEntity<? super NotificationListResponseDto> list() {
        List<NotificationDto> list = new ArrayList<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null || !(authentication.getPrincipal() instanceof CustomUserDetails)){
            throw new CustomAuthenticationException("인증 정보가 없어요", HttpStatus.UNAUTHORIZED);
        }
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        int userId = customUserDetails.getUserId();
        UserEntity userEntity = userRepository.findByUserId(userId);
        if (userEntity == null) {
            throw new UserNotFoundException();
        }

        List<NotificationEntity> entityList = notificationRepository.findByUserEntityOrderBySendDateDesc(userEntity);
        entityList.stream().forEach((e) -> {
            NotificationDto notificationDto = new NotificationDto();
            notificationDto.setNotificationId(e.getNotificationId());
            notificationDto.setNotificationContents(e.getNotificationContents());
            notificationDto.setLink(e.getLink());
            notificationDto.setReadOrNot(e.getReadOrNot());
            notificationDto.setSendDate(e.getSendDate());
            notificationDto.setUserId(userEntity.getUserId());

            Integer commonCodeId = e.getCommonCodeEntity().getCommonCodeId();
            notificationDto.setCommonCodeId(commonCodeId);
            NotificationMessageTemplateEntity notificationMessageTemplateEntity = notificationMessageTemplateRepository.findByCommonCodeId(commonCodeId);
            if(notificationMessageTemplateEntity == null) {
                throw new CustomException(HttpStatus.BAD_REQUEST, ResponseCode.BAD_REQUEST, "존재하지 않는 메시지 템플릿의 공통 코드 입니다.");
            }
            notificationDto.setNotification_message_title(notificationMessageTemplateEntity.getNotificationMessageTitle());
            list.add(notificationDto);
        });

        return NotificationListResponseDto.success(list);
    }

    @Override
    @Transactional
    public ResponseEntity<? super NotificationCreateResponseDto> create(NotificationCreateRequestDto dto) {
        // 수신인
        int userId = dto.getReceivingMemberId();
        UserEntity userEntity = userRepository.findByUserId(userId);
        if (userEntity == null) {
            throw new UserNotFoundException();
        }
        String senderName = dto.getSenderName();
        // 그룹
        String groupName = dto.getGroupName();
        // 챌린지
        String day = dto.getDay();

        NotificationEntity notificationEntity = new NotificationEntity();
        notificationEntity.setLink(dto.getLink());
        notificationEntity.setSendDate(LocalDateTime.now()); // 현재 날짜 담기
        notificationEntity.setReadOrNot(false);

        CommonCodeEntity commonCodeEntity = commonCodeRepository.findByCommonCodeId(dto.getCommonCodeId());
        if(commonCodeEntity == null) {
            throw new CustomException(HttpStatus.BAD_REQUEST, ResponseCode.BAD_REQUEST, "존재하지 않는 공통 코드 Id 입니다.");
        }
        notificationEntity.setCommonCodeEntity(commonCodeEntity);
        notificationEntity.setUserEntity(userEntity);

        NotificationMessageTemplateEntity notificationMessageTemplateEntity = notificationMessageTemplateRepository.findByCommonCodeId(dto.getCommonCodeId());
        if(notificationMessageTemplateEntity == null) {
            throw new CustomException(HttpStatus.BAD_REQUEST, ResponseCode.BAD_REQUEST, "존재하지 않는 메시지 템플릿의 공통 코드 입니다.");
        }
        String title = notificationMessageTemplateEntity.getNotificationMessageTitle();
        String temp = notificationMessageTemplateEntity.getNotificationMessageContent();

        //각 공통코드 마다 다르게 notification_content 담기
        // 각 공통코드 마다 다르게 notification_content 담기
        String messageTemplate = "";

        int commonCodeId = dto.getCommonCodeId();

        if(commonCodeId == 201 || commonCodeId == 301 ||
                commonCodeId == 303  || commonCodeId == 601 || commonCodeId == 603){
            messageTemplate = temp
                    .replace("{damjjokName}", dto.getDamjjokName())
                    .replace("{groupName}", groupName);
        }
        else if(commonCodeId == 101 || commonCodeId == 302
                || commonCodeId == 304 || commonCodeId == 602){
            messageTemplate = temp
                    .replace("{groupName}", groupName);
        }
        else if(commonCodeId == 401){
            messageTemplate = temp
                    .replace("{damjjokName}", dto.getDamjjokName())
                    .replace("{groupName}", groupName)
                    .replace("{day}", day);
        }
        else if(commonCodeId == 501){
            messageTemplate = temp
                    .replace("{senderName}", senderName)
                    .replace("{groupName}", groupName);
        }

        // 실제 알림 전송
        fcmAlarmService.sendNotification(userEntity.getFcmToken(),title ,messageTemplate);
        // 디비에 값 저장
        notificationEntity.setNotificationContents(messageTemplate);
        notificationRepository.save(notificationEntity);

        return NotificationCreateResponseDto.success();
    }

    @Override
    @Transactional
    public ResponseEntity<? super NotificationCheckReadResponseDto> checkRead(NotificationCheckReadRequestDto dto) {

        int notificationId = dto.getNotificationId();
        NotificationEntity notificationEntity = notificationRepository.findByNotificationId(notificationId);
        if (notificationEntity == null) {
            throw new CustomException(HttpStatus.BAD_REQUEST, ResponseCode.BAD_REQUEST, "존재하지 않는 알림 Id 입니다.");
        }
        notificationEntity.setReadOrNot(true);
        notificationRepository.save(notificationEntity);

        return NotificationCheckReadResponseDto.success();
    }
}
