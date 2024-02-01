package com.ssafy.server.repository;

import com.ssafy.server.entity.TokenEntity;
import org.springframework.data.repository.CrudRepository;

public interface TokenRedisRepository extends CrudRepository<TokenEntity, String> {
}
