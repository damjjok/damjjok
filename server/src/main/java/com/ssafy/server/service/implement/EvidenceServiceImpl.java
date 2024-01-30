package com.ssafy.server.service.implement;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.proof.EvidenceDto;
import com.ssafy.server.dto.request.proof.EvidenceCreateRequestDto;
import com.ssafy.server.dto.request.proof.EvidenceDetailRequestDto;
import com.ssafy.server.dto.request.proof.EvidenceModifyRequestDto;
import com.ssafy.server.dto.response.proof.EvidenceCreateResponseDto;
import com.ssafy.server.dto.response.proof.EvidenceDetailResponseDto;
import com.ssafy.server.dto.response.proof.EvidenceModifyResponseDto;
import com.ssafy.server.entity.ChallengeEntity;
import com.ssafy.server.entity.EvidenceEntity;
import com.ssafy.server.entity.UserEntity;
import com.ssafy.server.repository.ChallengeRepository;
import com.ssafy.server.repository.EvidenceRepository;
import com.ssafy.server.repository.UserRepository;
import com.ssafy.server.service.EvidenceService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EvidenceServiceImpl implements EvidenceService {

    private final ChallengeRepository challengeRepository;
    private final EvidenceRepository evidenceRepository;
    private final UserRepository userRepository;
    @Override
    @Transactional
    public ResponseEntity<? super EvidenceCreateResponseDto> createEvidence(EvidenceCreateRequestDto dto) {

        try{
            MultipartFile image = dto.getImage();
            int challengeId = dto.getChallengeId();
            int userId = dto.getUserId();
            String title = dto.getTitle();

            String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\files";

            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();

            File saveFile = new File(projectPath, fileName);
            //C:\Users\audtj\Desktop\SSAFY_E105\S10P12E105\server\src\main\resources\files
            image.transferTo(saveFile);

            ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);
            EvidenceEntity evidenceEntity = new EvidenceEntity();
            evidenceEntity.setCreatedBy(userId);
            evidenceEntity.setEvidenceTitle(title);
            evidenceEntity.setChallengeEntity(challengeEntity);
            evidenceEntity.setImageDate(LocalDateTime.now()); // TODO : 나중에 메타데이터로 바꿔주기
            evidenceEntity.setImagePath("/files/" + fileName);
            evidenceEntity.setUpdatedBy(userId);

            evidenceRepository.save(evidenceEntity);


        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return EvidenceCreateResponseDto.success();
    }

    @Override
    @Transactional
    public ResponseEntity<? super EvidenceModifyResponseDto> modifyEvidence(EvidenceModifyRequestDto dto) {
        try{
            MultipartFile image = dto.getImage();
            String title = dto.getTitle();
            int userId = dto.getUserId();
            int evidenceId = dto.getEvidenceId();

            EvidenceEntity evidenceEntity = evidenceRepository.findByEvidenceId(evidenceId);
            if(userId != evidenceEntity.getCreatedBy()) return ResponseDto.validationFail();

            String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\files";
            // TODO : 원래 있던 파일 제거
            File oldFile = new File(projectPath, evidenceEntity.getImagePath().substring(6));
            if(oldFile.exists()){
                if(oldFile.delete()){
                    System.out.println("파일 삭제 됨");
                }
            }

            // TODO : 파일 생성


            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();

            File saveFile = new File(projectPath, fileName);

            image.transferTo(saveFile);

            // TODO : 본인이 맞는지 확인



            evidenceEntity.setEvidenceTitle(title);
            evidenceEntity.setImageDate(LocalDateTime.now()); // TODO : 메타 데이터
            evidenceEntity.setUpdatedAt(LocalDateTime.now());
            evidenceEntity.setImagePath("/files/" + fileName);


            evidenceRepository.save(evidenceEntity);



        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return EvidenceModifyResponseDto.success();
    }

    @Override
    public ResponseEntity<? super EvidenceDetailResponseDto> detailEvidence(EvidenceDetailRequestDto dto) {
        EvidenceDto evidence = null;
        try{
            int evidenceId = dto.getEvidenceId();

            EvidenceEntity evidenceEntity = evidenceRepository.findByEvidenceId(evidenceId);

            if(evidenceEntity == null) return ResponseDto.validationFail();

            evidence = new EvidenceDto();
            evidence.setEvidenceId(evidenceEntity.getEvidenceId());
            evidence.setEvidenceTitle(evidenceEntity.getEvidenceTitle());
            evidence.setImagePath(evidenceEntity.getImagePath());
            evidence.setImageDate(evidenceEntity.getImageDate());
            evidence.setCreatedBy(evidenceEntity.getCreatedBy());


        }catch(Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return EvidenceDetailResponseDto.success(evidence);
    }
}
