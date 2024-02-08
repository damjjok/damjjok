package com.ssafy.server.service.implement;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.auth.CustomUserDetails;
import com.ssafy.server.dto.notification.NotificationDto;
import com.ssafy.server.dto.request.notification.NotificationCheckReadRequestDto;
import com.ssafy.server.dto.request.notification.NotificationCreateRequestDto;
import com.ssafy.server.dto.request.notification.NotificationListRequestDto;
import com.ssafy.server.dto.response.notification.NotificationCheckReadResponseDto;
import com.ssafy.server.dto.response.notification.NotificationCreateResponseDto;
import com.ssafy.server.dto.response.notification.NotificationListResponseDto;
import com.ssafy.server.entity.CommonCodeEntity;
import com.ssafy.server.entity.GroupEntity;
import com.ssafy.server.entity.NotificationEntity;
import com.ssafy.server.entity.UserEntity;
import com.ssafy.server.repository.CommonCodeRepository;
import com.ssafy.server.repository.GroupRepository;
import com.ssafy.server.repository.NotificationRepository;
import com.ssafy.server.repository.UserRepository;
import com.ssafy.server.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;
    private final CommonCodeRepository commonCodeRepository;
    private final GroupRepository groupRepository;
    @Override
    public ResponseEntity<? super NotificationListResponseDto> list(NotificationListRequestDto dto) {
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


                CommonCodeEntity commonCodeEntity = commonCodeRepository.findByCommonCodeId(e.getCommonCodeEntity().getCommonCodeId());
                notificationDto.setCommonCodeId(commonCodeEntity.getCommonCodeId());


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
            int userId = dto.getReceivingMemberId();
            UserEntity userEntity = userRepository.findByUserId(userId);
            //수신인 이름
            String userName = userEntity.getUserName();

            int groupId = dto.getGroupId();
            GroupEntity groupEntity = groupRepository.findByGroupId(groupId);
            String groupName = groupEntity.getGroupName();

            NotificationEntity notificationEntity = new NotificationEntity();
            notificationEntity.setLink(dto.getLink());
            notificationEntity.setSendDate(LocalDateTime.now()); // 현재 날짜 담기
            notificationEntity.setReadOrNot(false);

            CommonCodeEntity commonCodeEntity = commonCodeRepository.findByCommonCodeId(dto.getCommonCodeId());
            notificationEntity.setCommonCodeEntity(commonCodeEntity);
            notificationEntity.setUserEntity(userEntity);
            //각 공통코드 마다 다르게 notification_content 담기
            // 각 공통코드 마다 다르게 notification_content 담기
            String messageTemplate = "";
            switch (dto.getCommonCodeId()) {
                case 101:
                    messageTemplate = String.format("%s 님이 새로운 모험을 함께 할 %s 으로 초대했어요!",
                            dto.getDamjjokName(), groupName);
                    break;
                case 201:
                    messageTemplate = String.format("%s 에서 %s 님이 새로운 도전을 시작했어요! 담쪽이를 응원해주세요!",
                            groupName, dto.getDamjjokName());
                    break;
                case 301:
                    messageTemplate = String.format("%s 의 %s 님의 챌린지가 3일 뒤에 종료됩니다. 마지막 까지 함께해요 !",
                            groupName, dto.getDamjjokName());
                    break;
                case 302:
                    messageTemplate = String.format("%s 이 3일 뒤에 삭제됩니다.",
                            groupName);
                    break;
                case 401:
                    messageTemplate = String.format("%s 에서의 %s 챌린지가 무려 %d 일이 되었어요!",
                            groupName, dto.getDamjjokName(), dto.getDay());
                    break;
                case 501:
                    messageTemplate = String.format("%s 님이 새로운 모험을 함께 할 %s 으로 초대했어요!",
                            dto.getSenderName(), groupName);
                    break;
                case 601:
                    messageTemplate = String.format("%s 님 %s 의 진실의 방 일정을 잡아주세요",
                            dto.getDamjjokName(), groupName);
                    break;
                case 602:
                    messageTemplate = String.format("%s 님 %s 의 담쪽이가 진실의 방 일정을 생성하였습니다.",
                            userName, groupName);
                    break;
                case 603:
                    messageTemplate = String.format("%s 에서 %s 님이 주최하는 진실의 방이 열리는 날!",
                            groupName, dto.getDamjjokName());
                    break;
                // 여기에 추가적인 케이스를 계속 추가할 수 있습니다.
                default:
                    messageTemplate = "알 수 없는 알림 타입입니다.";
                    break;
            }
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
