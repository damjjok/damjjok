package com.ssafy.server.service.implement;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.proof.TestimonyDto;
import com.ssafy.server.dto.request.TestimonyCreateRequestDto;
import com.ssafy.server.dto.request.TestimonyListRequestDto;
import com.ssafy.server.dto.response.TestimonyCreateResponseDto;
import com.ssafy.server.dto.response.TestimonyListResponseDto;
import com.ssafy.server.entity.ChallengeEntity;
import com.ssafy.server.entity.TestimonyEntity;
import com.ssafy.server.repository.ChallengeRepository;
import com.ssafy.server.repository.TestimonyRepository;
import com.ssafy.server.service.TestimonyService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class TestimonyServiceImpl implements TestimonyService {

    private final TestimonyRepository testimonyRepository;
    private final ChallengeRepository challengeRepository;
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

                list.add(testimonyDto);
            });

        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return TestimonyListResponseDto.success(list);
    }

}
