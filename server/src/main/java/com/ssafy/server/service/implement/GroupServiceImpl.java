package com.ssafy.server.service.implement;

import com.ssafy.server.dto.request.group.GroupRequestDto;
import com.ssafy.server.dto.response.group.GroupResponseDto;
import com.ssafy.server.entity.GroupEntity;
import com.ssafy.server.repository.GroupRepository;
import com.ssafy.server.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupRepository groupRepository;

    @Override
    public ResponseEntity<? super GroupResponseDto> create(GroupRequestDto dto) {
        try{

            GroupEntity groupEntity = new GroupEntity();
            groupEntity.setGroupName(dto.getName());
            groupEntity.setCreatedBy(dto.getCreated_by());
            groupEntity.setCreatedAt(LocalDateTime.now());
            groupEntity.setEndDate(LocalDateTime.now().plusMonths(1));

            String invitationLink = "https://loaclhost:8080/api/v1/group/invite/validate/" + UUID.randomUUID().toString();
            groupEntity.setInvitationLink(invitationLink);

            groupRepository.save(groupEntity);

        }catch (Exception e){
            e.printStackTrace();
            return GroupResponseDto.databaseError();
        }
        return GroupResponseDto.success();
    }
}
