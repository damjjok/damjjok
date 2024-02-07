package com.ssafy.server.service.implement;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.notification.NotificationDto;
import com.ssafy.server.dto.request.notification.NotificationListRequestDto;
import com.ssafy.server.dto.response.notification.NotificationListResponseDto;
import com.ssafy.server.entity.CommonCodeEntity;
import com.ssafy.server.entity.NotificationEntity;
import com.ssafy.server.entity.UserEntity;
import com.ssafy.server.repository.CommonCodeRepository;
import com.ssafy.server.repository.NotificationRepository;
import com.ssafy.server.repository.UserRepository;
import com.ssafy.server.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;
    private final CommonCodeRepository commonCodeRepository;
    @Override
    public ResponseEntity<? super NotificationListResponseDto> list(NotificationListRequestDto dto) {
        List<NotificationDto> list = new ArrayList<>();
        try {
            int userId = dto.getUserId();

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
}
