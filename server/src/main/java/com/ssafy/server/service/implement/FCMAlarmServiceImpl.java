package com.ssafy.server.service.implement;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.ssafy.server.service.FCMAlarmService;
import org.springframework.stereotype.Service;

@Service
public class FCMAlarmServiceImpl implements FCMAlarmService {

    public String sendNotification(String token, String title, String body) {
        Message message = Message.builder()
                .putData("title", title)
                .putData("body", body)
                .setToken(token)
                .build();

        try {
            // 메시지를 보내고 메시지 ID를 받습니다
            return FirebaseMessaging.getInstance().send(message);
        } catch (FirebaseMessagingException e) {
            e.printStackTrace();
            return null;
        }
    }
}
