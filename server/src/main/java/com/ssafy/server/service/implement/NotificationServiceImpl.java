package com.ssafy.server.service.implement;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.auth.CustomUserDetails;
import com.ssafy.server.dto.notification.NotificationDto;
import com.ssafy.server.dto.request.notification.NotificationCheckReadRequestDto;
import com.ssafy.server.dto.request.notification.NotificationCreateRequestDto;
import com.ssafy.server.dto.response.notification.NotificationCheckReadResponseDto;
import com.ssafy.server.dto.response.notification.NotificationCreateResponseDto;
import com.ssafy.server.dto.response.notification.NotificationListResponseDto;
import com.ssafy.server.entity.*;
import com.ssafy.server.repository.*;
import com.ssafy.server.service.FCMAlarmService;
import com.ssafy.server.service.NotificationService;
import lombok.RequiredArgsConstructor;
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
    public ResponseEntity<? super NotificationListResponseDto> list() {
        List<NotificationDto> list = new ArrayList<>();
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
            int userId = customUserDetails.getUserId();

            UserEntity userEntity = userRepository.findByUserId(userId);
            List<NotificationEntity> entityList = notificationRepository.findByUserEntity(userEntity);

            entityList.stream().forEach((e) -> {
                NotificationDto notificationDto = new NotificationDto();
                notificationDto.setNotificationId(e.getNotificationId());
                notificationDto.setNotificationContents(e.getNotificationContents());
                notificationDto.setLink(e.getLink());
                notificationDto.setReadOrNot(e.getReadOrNot());
                notificationDto.setSendDate(e.getSendDate());
                notificationDto.setUserId(userEntity.getUserId());

                Integer commonCodeId = e.getCommonCodeEntity().getCommonCodeId();

                NotificationMessageTemplateEntity notificationMessageTemplateEntity = notificationMessageTemplateRepository.findByCommonCodeId(commonCodeId);
                notificationDto.setNotification_message_title(notificationMessageTemplateEntity.getNotificationMessageTitle());

                list.add(notificationDto);
            });

        }catch (Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return NotificationListResponseDto.success(list);
    }

    @Override
    public ResponseEntity<? super NotificationCreateResponseDto> create(NotificationCreateRequestDto dto) {

        try{

            // 수신인
            int userId = dto.getReceivingMemberId();
            UserEntity userEntity = userRepository.findByUserId(userId);
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
            notificationEntity.setCommonCodeEntity(commonCodeEntity);
            notificationEntity.setUserEntity(userEntity);

            NotificationMessageTemplateEntity notificationMessageTemplateEntity = notificationMessageTemplateRepository.findByCommonCodeId(dto.getCommonCodeId());
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

        }catch (Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return NotificationCreateResponseDto.success();
    }

    @Override
    public ResponseEntity<? super NotificationCheckReadResponseDto> checkRead(NotificationCheckReadRequestDto dto) {
        try{
            int notificationId = dto.getNotificationId();
            NotificationEntity notificationEntity = notificationRepository.findByNotificationId(notificationId);

            notificationEntity.setReadOrNot(true);
            notificationRepository.save(notificationEntity);
        }catch (Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return NotificationCheckReadResponseDto.success();
    }
}
