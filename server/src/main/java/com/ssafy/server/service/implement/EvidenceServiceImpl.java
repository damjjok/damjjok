package com.ssafy.server.service.implement;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.auth.CustomUserDetails;
import com.ssafy.server.dto.proof.EvidenceDto;
import com.ssafy.server.dto.request.notification.NotificationCreateRequestDto;
import com.ssafy.server.dto.request.proof.*;
import com.ssafy.server.dto.response.proof.*;
import com.ssafy.server.entity.ChallengeEntity;
import com.ssafy.server.entity.EvidenceEntity;
import com.ssafy.server.entity.GroupEntity;
import com.ssafy.server.entity.UserEntity;
import com.ssafy.server.repository.*;
import com.ssafy.server.service.EvidenceService;
import com.ssafy.server.service.NotificationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EvidenceServiceImpl implements EvidenceService {

    private final ChallengeRepository challengeRepository;
    private final EvidenceRepository evidenceRepository;
    private final UserRepository userRepository;

    private final GroupRepository groupRepository;
    private final GroupMemberRepository groupMemberRepository;

    private final NotificationService notificationService;

    @Override
    @Transactional
    public ResponseEntity<? super EvidenceCreateResponseDto> createEvidence(EvidenceCreateRequestDto dto) {

        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

            MultipartFile image = dto.getImage();
            int challengeId = dto.getChallengeId();
            int userId = customUserDetails.getUserId();
            String name = customUserDetails.getUserName();
            String title = dto.getTitle();

//            String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\files";

            String projectPath = "/var/www/html/images";
            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();

            File saveFile = new File(projectPath, fileName);
            //C:\Users\audtj\Desktop\SSAFY_E105\S10P12E105\server\src\main\resources\files
            image.transferTo(saveFile);

            ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);
            EvidenceEntity evidenceEntity = new EvidenceEntity();
            evidenceEntity.setCreatedBy(userId);
            evidenceEntity.setEvidenceTitle(title);
            evidenceEntity.setChallengeEntity(challengeEntity);
            evidenceEntity.setImageDate(dto.getImageDate()); //메타데이터로 변경
            evidenceEntity.setImagePath("/images/" + fileName);
            evidenceEntity.setUpdatedBy(userId);

            evidenceRepository.save(evidenceEntity);

            // 챌린지 멤버한테 모두 알림 쏘기
            int groupId = challengeEntity.getGroupEntity().getGroupId();
            GroupEntity groupEntity = groupRepository.findByGroupId(groupId);

            List<UserEntity> userEntityList = groupMemberRepository.findUsersByGroupId(groupId);
            userEntityList.stream().forEach(user -> {
                NotificationCreateRequestDto ncrDto = new NotificationCreateRequestDto();
                ncrDto.setCommonCodeId(501);
                ncrDto.setReceivingMemberId(user.getUserId());
                ncrDto.setSenderName(name);
                ncrDto.setLink("https://");
                ncrDto.setGroupName(groupEntity.getGroupName());

                notificationService.create(ncrDto);
            });


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
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

            MultipartFile image = dto.getImage();
            String title = dto.getTitle();
            int userId = customUserDetails.getUserId();
            int evidenceId = dto.getEvidenceId();

            EvidenceEntity evidenceEntity = evidenceRepository.findByEvidenceId(evidenceId);
            if(userId != evidenceEntity.getCreatedBy()) return ResponseDto.validationFail();

//            String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\files";
            String projectPath = "/var/www/html/images";
            // TODO : 원래 있던 파일 제거
            File oldFile = new File(projectPath, evidenceEntity.getImagePath().substring(7));
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

            UserEntity userEntity = userRepository.findByUserId(evidenceEntity.getCreatedBy());
            evidence = new EvidenceDto();
            evidence.setUserName(userEntity.getUserName());
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

    @Override
    public ResponseEntity<? super EvidenceListResponseDto> listEvidence(EvidenceListRequestDto dto) {
        List<EvidenceDto> list = new ArrayList<>();
        try {
            int challengeId = dto.getChallengeId();

            ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);

            //생성 날짜 기준 내림차순
            Sort sort = Sort.by("createdAt").descending();
            List<EvidenceEntity> entityList = evidenceRepository.findByChallengeEntity(challengeEntity, sort);

            entityList.stream().forEach(e ->{
                EvidenceDto evidenceDto = new EvidenceDto();
                evidenceDto.setEvidenceId(e.getEvidenceId());
                evidenceDto.setEvidenceTitle(e.getEvidenceTitle());
                evidenceDto.setCreatedBy(e.getCreatedBy());
                evidenceDto.setImagePath(e.getImagePath());
                evidenceDto.setImageDate(e.getImageDate());
                UserEntity userEntity = userRepository.findByUserId(e.getCreatedBy());
                evidenceDto.setUserName(userEntity.getUserName());

                list.add(evidenceDto);
            });

        }catch (Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return EvidenceListResponseDto.success(list);
    }

    @Override
    public ResponseEntity<? super EvidenceForTruthRoomResponseDto> listEvidenceForTruthRoom(EvidenceForTruthRoomRequestDto dto) {
        List<EvidenceDto> list = new ArrayList<>();
        try {
            int challengeId = dto.getChallengeId();

            ChallengeEntity challengeEntity = challengeRepository.findByChallengeId(challengeId);
            // createdAt 기준으로 내림차순 정렬
            Sort sort = Sort.by("createdAt").descending();
            List<EvidenceEntity> entityList = evidenceRepository.findByChallengeEntity(challengeEntity, sort);

            entityList.stream().forEach(e ->{
                if(e.getCreatedAt().isBefore(challengeEntity.getFinalTruthRoomDate())) return;
                EvidenceDto evidenceDto = new EvidenceDto();
                evidenceDto.setEvidenceId(e.getEvidenceId());
                evidenceDto.setEvidenceTitle(e.getEvidenceTitle());
                evidenceDto.setCreatedBy(e.getCreatedBy());
                evidenceDto.setImagePath(e.getImagePath());
                evidenceDto.setImageDate(e.getImageDate());
                UserEntity userEntity = userRepository.findByUserId(e.getCreatedBy());
                evidenceDto.setUserName(userEntity.getUserName());

                list.add(evidenceDto);
            });

            if(list.isEmpty()) return ResponseDto.validationFail();

        }catch (Exception exception){
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return EvidenceForTruthRoomResponseDto.success(list);
    }
}
