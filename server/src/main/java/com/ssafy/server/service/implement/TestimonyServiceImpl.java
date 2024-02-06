package com.ssafy.server.service.implement;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.proof.TestimonyDto;
import com.ssafy.server.dto.request.proof.*;
import com.ssafy.server.dto.response.proof.*;
import com.ssafy.server.entity.ChallengeEntity;
import com.ssafy.server.entity.EvidenceEntity;
import com.ssafy.server.entity.TestimonyEntity;
import com.ssafy.server.entity.UserEntity;
import com.ssafy.server.repository.ChallengeRepository;
import com.ssafy.server.repository.EvidenceRepository;
import com.ssafy.server.repository.TestimonyRepository;
import com.ssafy.server.repository.UserRepository;
import com.ssafy.server.service.TestimonyService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class TestimonyServiceImpl implements TestimonyService {

    private final TestimonyRepository testimonyRepository;
    private final ChallengeRepository challengeRepository;
    private final EvidenceRepository evidenceRepository;
    private final UserRepository userRepository;
    public ResponseEntity<? super TestimonyCreateResponseDto> create(TestimonyCreateRequestDto dto){
        try {
            String title = dto.getTitle();
            String content = dto.getContent();
            int challengeId = dto.getChallengeId();

            ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);

            TestimonyEntity testimonyEntity = new TestimonyEntity();
            testimonyEntity.setChallengeEntity(challengeEntity);
            testimonyEntity.setTestimonyTitle(title);
            testimonyEntity.setTestimonyContent(content);
            testimonyEntity.setCreatedBy(0);
            testimonyEntity.setUpdatedBy(0);

            // TODO : 여기 나중에 유저정보 받아와서 넣어줘야함


            testimonyRepository.save(testimonyEntity);


        }catch (Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return TestimonyCreateResponseDto.success();
    }

    @Override
    public ResponseEntity<? super TestimonyListResponseDto> list(TestimonyListRequestDto dto) {

        List<TestimonyDto> list = new ArrayList<>();
        try{
            int challengeId = dto.getChallengeId();

            ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);
            List<TestimonyEntity> entityList = testimonyRepository.findByChallengeEntity(challengeEntity);

            entityList.stream().forEach((e) -> {
                TestimonyDto testimonyDto = new TestimonyDto();
                testimonyDto.setTestimonyId(e.getTestimonyId());
                testimonyDto.setTestimonyTitle(e.getTestimonyTitle());
                testimonyDto.setTestimonyContent(e.getTestimonyContent());
                testimonyDto.setCreatedAt(e.getCreatedAt());
                testimonyDto.setCreatedBy(e.getCreatedBy());
                testimonyDto.setUpdatedAt(e.getUpdatedAt());
                testimonyDto.setUpdatedBy(e.getUpdatedBy());

                UserEntity userEntity = userRepository.findByUserId(e.getCreatedBy());
                testimonyDto.setUserName(userEntity.getUserName());

                list.add(testimonyDto);
            });

        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return TestimonyListResponseDto.success(list);
    }

    @Override
    public ResponseEntity<? super TestimonyDetailResponseDto> detail(TestimonyDetailRequestDto dto) {

        TestimonyDto testimony = null;
        try{
            int testimonyId = dto.getTestimonyId();

            TestimonyEntity e = testimonyRepository.findByTestimonyId(testimonyId);
            testimony = new TestimonyDto();
            testimony.setTestimonyId(e.getTestimonyId());
            testimony.setTestimonyTitle(e.getTestimonyTitle());
            testimony.setTestimonyContent(e.getTestimonyContent());
            testimony.setCreatedAt(e.getCreatedAt());
            testimony.setCreatedBy(e.getCreatedBy());
            testimony.setUpdatedAt(e.getUpdatedAt());
            testimony.setUpdatedBy(e.getUpdatedBy());
            UserEntity userEntity = userRepository.findByUserId(e.getCreatedBy());
            testimony.setUserName(userEntity.getUserName());

        }catch (Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return TestimonyDetailResponseDto.success(testimony);
    }

    @Override
    public ResponseEntity<? super TestimonyModifyResponseDto> modify(TestimonyModifyRequestDto dto) {
        try{
            int testimonyId = dto.getTestimonyId();
            String title = dto.getTitle();
            String content = dto.getContent();


            TestimonyEntity testimonyEntity = testimonyRepository.findByTestimonyId(testimonyId);
            testimonyEntity.setTestimonyId(testimonyId);
            testimonyEntity.setTestimonyTitle(title);
            testimonyEntity.setTestimonyContent(content);
            testimonyEntity.setUpdatedAt(LocalDateTime.now());

            testimonyRepository.save(testimonyEntity);

        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return TestimonyModifyResponseDto.success();
    }

    @Override
    public ResponseEntity<? super TestimonyForTruthRoomResponseDto> listForTruthRoom(TestimonyForTruthRoomRequestDto dto) {
        List<TestimonyDto> list = new ArrayList<>();
        try{
            int challengeId = dto.getChallengeId();

            ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);
            List<TestimonyEntity> entityList = testimonyRepository.findByChallengeEntity(challengeEntity);

            entityList.stream().forEach((e) -> {
                if(e.getCreatedAt().isBefore(challengeEntity.getFinalTruthRoomDate())) return;
                TestimonyDto testimonyDto = new TestimonyDto();
                testimonyDto.setTestimonyId(e.getTestimonyId());
                testimonyDto.setTestimonyTitle(e.getTestimonyTitle());
                testimonyDto.setTestimonyContent(e.getTestimonyContent());
                testimonyDto.setCreatedAt(e.getCreatedAt());
                testimonyDto.setCreatedBy(e.getCreatedBy());
                testimonyDto.setUpdatedAt(e.getUpdatedAt());
                testimonyDto.setUpdatedBy(e.getUpdatedBy());

                UserEntity userEntity = userRepository.findByUserId(e.getCreatedBy());
                testimonyDto.setUserName(userEntity.getUserName());

                list.add(testimonyDto);
            });

        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return TestimonyForTruthRoomResponseDto.success(list);
    }


}
