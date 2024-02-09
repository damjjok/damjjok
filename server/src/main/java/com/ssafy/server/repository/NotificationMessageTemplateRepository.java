package com.ssafy.server.repository;

import com.ssafy.server.entity.CommonCodeEntity;
import com.ssafy.server.entity.NotificationMessageTemplateEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationMessageTemplateRepository extends JpaRepository<NotificationMessageTemplateEntity, Integer> {
    NotificationMessageTemplateEntity findByCommonCodeId(Integer commonCodeId);
}
