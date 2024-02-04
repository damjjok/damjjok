package com.ssafy.server.repository;

import com.ssafy.server.entity.ImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRespository extends JpaRepository<ImageEntity, Integer> {
    ImageEntity findByImageId(int imageId);
}
