package com.ssafy.server.service;

public interface SchedulerService {
    void testCheckSchedule();
    void checkSchedule(); //모든 챌린지의 진실의 방 일정중에 오늘 날짜를 지났는데
    //시작되지 않은 일정이 있다면 종료시켜주고, 마지막 진실의 방 종료일을 오늘 날짜로 바꿔주기
}

