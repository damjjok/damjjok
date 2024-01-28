package com.ssafy.server.service.implement;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.request.TestimonyCreateRequestDto;
import com.ssafy.server.dto.response.TestimonyCreateResponseDto;
import com.ssafy.server.entity.ChallengeEntity;
import com.ssafy.server.entity.TestimonyEntity;
import com.ssafy.server.repository.ChallengeRepository;
import com.ssafy.server.repository.TestimonyRepository;
import com.ssafy.server.service.TestimonyService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


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

}
