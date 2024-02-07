package com.ssafy.server.service;

public interface FCMAlarmService {
    String sendNotification(String token, String title, String body);
}
