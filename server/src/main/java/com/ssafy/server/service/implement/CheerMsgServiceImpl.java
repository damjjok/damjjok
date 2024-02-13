package com.ssafy.server.service.implement;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.auth.CustomUserDetails;
import com.ssafy.server.dto.cheermsg.CheerMessageDto;
import com.ssafy.server.dto.request.cheermsg.CheerMsgCreateRequestDto;
import com.ssafy.server.dto.request.cheermsg.CheerMsgListRequestDto;
import com.ssafy.server.dto.response.cheermsg.CheerMsgCreateResponseDto;
import com.ssafy.server.dto.response.cheermsg.CheerMsgListResponseDto;
import com.ssafy.server.entity.*;
import com.ssafy.server.exception.ChallengeNotFoundException;
import com.ssafy.server.exception.CustomAuthenticationException;
import com.ssafy.server.exception.UserNotFoundException;
import com.ssafy.server.repository.ChallengeRepository;
import com.ssafy.server.repository.CheeringMessageRepository;
import com.ssafy.server.repository.UserRepository;
import com.ssafy.server.service.CheerMsgService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CheerMsgServiceImpl implements CheerMsgService {
    private final ChallengeRepository challengeRepository;
    private final UserRepository userRepository;
    private final CheeringMessageRepository cheeringMessageRepository;

    @Override
    public ResponseEntity<? super CheerMsgCreateResponseDto> create(CheerMsgCreateRequestDto dto) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null || !(authentication.getPrincipal() instanceof CustomUserDetails)){
            throw new CustomAuthenticationException("사용자 인증 다시 해주세요.");
        }
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        int userId = customUserDetails.getUserId();
        int challengeId = dto.getChallengeId();

        UserEntity userEntity = userRepository.findByUserId(userId);
        if(userEntity == null) throw new UserNotFoundException();

        ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);
        if(challengeEntity == null) throw new ChallengeNotFoundException();

        CheeringMessageEntity cheeringMessageEntity = new CheeringMessageEntity();
        cheeringMessageEntity.setContent(dto.getContent());
        cheeringMessageEntity.setChallengeEntity(challengeEntity);
        cheeringMessageEntity.setUserEntity(userEntity);

        cheeringMessageRepository.save(cheeringMessageEntity);

        return CheerMsgCreateResponseDto.success();
    }

    @Override
    public ResponseEntity<? super CheerMsgListResponseDto> list(CheerMsgListRequestDto dto) {
        List<CheerMessageDto> list = new ArrayList<>();

        int challengeId = dto.getChallengeId();

        ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);
        if(challengeEntity == null) throw new ChallengeNotFoundException();

        List<CheeringMessageEntity> entities = cheeringMessageRepository.findByChallengeEntity(challengeEntity);
        entities.stream().forEach(e ->{
            CheerMessageDto cheerMessage = new CheerMessageDto();
            cheerMessage.setUserName(e.getUserEntity().getUserName());
            cheerMessage.setContent(e.getContent());
            cheerMessage.setCreatedAt(e.getCreatedAt());
            list.add(cheerMessage);
        });
        
        return CheerMsgListResponseDto.success(list);
    }
}
