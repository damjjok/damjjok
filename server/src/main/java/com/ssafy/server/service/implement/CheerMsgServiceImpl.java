package com.ssafy.server.service.implement;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.cheermsg.CheerMessageDto;
import com.ssafy.server.dto.request.cheermsg.CheerMsgCreateRequestDto;
import com.ssafy.server.dto.request.cheermsg.CheerMsgListRequestDto;
import com.ssafy.server.dto.response.cheermsg.CheerMsgCreateResponseDto;
import com.ssafy.server.dto.response.cheermsg.CheerMsgListResponseDto;
import com.ssafy.server.entity.*;
import com.ssafy.server.repository.ChallengeRepository;
import com.ssafy.server.repository.CheeringMessageRepository;
import com.ssafy.server.repository.UserRepository;
import com.ssafy.server.service.CheerMsgService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
        try {
            int userId = dto.getUserId();
            int challengeId = dto.getChallengeId();

            UserEntity userEntity = userRepository.findByUserId(userId);
            ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);

            CheeringMessageEntity cheeringMessageEntity = new CheeringMessageEntity();
            cheeringMessageEntity.setContent(dto.getContent());
            cheeringMessageEntity.setChallengeEntity(challengeEntity);
            cheeringMessageEntity.setUserEntity(userEntity);

            cheeringMessageRepository.save(cheeringMessageEntity);


        }catch (Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return CheerMsgCreateResponseDto.success();
    }

    @Override
    public ResponseEntity<? super CheerMsgListResponseDto> list(CheerMsgListRequestDto dto) {
        List<CheerMessageDto> list = new ArrayList<>();
        try{
            int challengeId = dto.getChallengeId();

            ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);
            List<CheeringMessageEntity> entities = cheeringMessageRepository.findByChallengeEntity(challengeEntity);
            entities.stream().forEach(e ->{
                CheerMessageDto cheerMessage = new CheerMessageDto();
                cheerMessage.setUserName(e.getUserEntity().getUserName());
                cheerMessage.setContent(e.getContent());
                cheerMessage.setCreatedAt(e.getCreatedAt());
                list.add(cheerMessage);
            });

        }catch (Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return CheerMsgListResponseDto.success(list);
    }
}
