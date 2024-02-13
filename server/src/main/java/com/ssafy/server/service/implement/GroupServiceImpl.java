package com.ssafy.server.service.implement;

import com.ssafy.server.common.ResponseCode;
import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.auth.CustomUserDetails;
import com.ssafy.server.dto.group.GroupDto;
import com.ssafy.server.dto.group.UserDto;
import com.ssafy.server.dto.group.UserInviteDto;
import com.ssafy.server.dto.request.group.GroupCreateRequestDto;
import com.ssafy.server.dto.request.group.GroupMemberCreateRequestDto;
import com.ssafy.server.dto.request.notification.NotificationCreateRequestDto;
import com.ssafy.server.dto.response.group.*;
import com.ssafy.server.entity.GroupEntity;
import com.ssafy.server.entity.GroupMemberEntity;
import com.ssafy.server.entity.GroupMemberId;
import com.ssafy.server.entity.UserEntity;
import com.ssafy.server.exception.*;
import com.ssafy.server.provider.JwtProvider;
import com.ssafy.server.repository.GroupMemberRepository;
import com.ssafy.server.repository.GroupRepository;
import com.ssafy.server.repository.UserRepository;
import com.ssafy.server.service.GroupService;
import com.ssafy.server.service.NotificationService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final GroupMemberRepository groupMemberRepository;

    private final NotificationService notificationService;

    @Override
    @Transactional
    public ResponseEntity<? super GroupCreateResponseDto> create(GroupCreateRequestDto dto) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null || !(authentication.getPrincipal() instanceof CustomUserDetails)){
            throw new CustomAuthenticationException("사용자 인증 다시 해주세요.");
        }
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        int userId = customUserDetails.getUserId();

        // 그룹 생성
        GroupEntity groupEntity = new GroupEntity();
        groupEntity.setGroupName(dto.getName());
        groupEntity.setCreatedBy(userId);
        groupEntity.setCreatedAt(LocalDateTime.now());
        groupEntity.setEndDate(LocalDateTime.now().plusMonths(1));

        String invitationLink = UUID.randomUUID().toString();
        groupEntity.setInvitationLink(invitationLink);

        GroupEntity savedGroupEntity = groupRepository.save(groupEntity);

        // 그룹 만든 사람 포함 + 초대받은 사람 한번에 그룹에 추가
        List<UserInviteDto> usersList = dto.getList();
        usersList.add(new UserInviteDto(userId)); // 담쪽이까지 추가

        usersList.stream().forEach(user -> {
            UserEntity userEntity = userRepository.findByUserId(user.getUserId());

            GroupMemberId groupMemberId = new GroupMemberId(savedGroupEntity.getGroupId(), user.getUserId());

            GroupMemberEntity entity = new GroupMemberEntity();
            entity.setGroupEntity(savedGroupEntity);
            entity.setUserEntity(userEntity);
            entity.setId(groupMemberId);

            // 그룹 멤버에 추가
            groupMemberRepository.save(entity);

            // 그룹 초대 알림 보내기 ( 그룹 만든 사람 뺴고 보내기 )
            if(user.getUserId() != userId) {
                NotificationCreateRequestDto ncrDto = new NotificationCreateRequestDto();
                ncrDto.setCommonCodeId(101);
                ncrDto.setReceivingMemberId(user.getUserId());
                ncrDto.setLink("https://");
                ncrDto.setGroupName(groupEntity.getGroupName());

                notificationService.create(ncrDto);
            }
        });

        return GroupCreateResponseDto.success();
    }

    @Override
    @Transactional
    public ResponseEntity<? super GroupInviteResponseDto> validateInvitationLink(String invitationLink) {

        GroupEntity groupEntity = null;

        groupEntity = groupRepository.findByInvitationLink(invitationLink);
        if(groupEntity == null) throw new CustomException(HttpStatus.BAD_REQUEST, ResponseCode.BAD_REQUEST, "존재하지 않는 초대링크 입니다.");

        return GroupInviteResponseDto.sendGroupInfo(groupEntity.getGroupId());
    }

    @Override
    @Transactional
    public ResponseEntity<? super GroupDetailResponseDto> groupDetail(int groupId) {

        GroupDto groupDto = new GroupDto();

        GroupEntity groupEntity = groupRepository.findByGroupId(groupId);
        if(groupEntity == null) throw new GroupNotFoundException();

        groupDto.setGroupId(groupEntity.getGroupId());
        groupDto.setGroupname(groupEntity.getGroupName());
        groupDto.setCreateAt(groupEntity.getCreatedAt());
        groupDto.setEndDate(groupEntity.getEndDate());

        UserEntity userEntity = userRepository.findByUserId(groupEntity.getCreatedBy());
        if(userEntity == null) throw new UserNotFoundException();

        groupDto.setCreatedBy(userEntity.getUserName());
        groupDto.setInvitationLink(groupEntity.getInvitationLink());

        return GroupDetailResponseDto.success(groupDto);
    }

    @Override
    @Transactional
    public ResponseEntity<? super GroupUserListResponseDto> userList(String email) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null || !(authentication.getPrincipal() instanceof CustomUserDetails)){
            throw new CustomAuthenticationException("사용자 인증 다시 해주세요.");
        }
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        int userId = customUserDetails.getUserId();

        List<UserDto> list = new ArrayList<>();

        List<UserEntity> userEntityList = userRepository.findByEmailContaining(email);

        userEntityList
                .stream()
                .filter(e -> e.getUserId() != userId)
                .forEach(e -> {
                    UserDto dto = new UserDto();
                    dto.setUserId(e.getUserId());
                    dto.setUserName(e.getUserName());
                    dto.setEmail(e.getEmail());
                    list.add(dto);
                });

        return GroupUserListResponseDto.success(list);
    }

    @Override
    @Transactional
    public ResponseEntity<? super GroupMemberCreateResponseDto> joinGroupMember(GroupMemberCreateRequestDto dto) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null || !(authentication.getPrincipal() instanceof CustomUserDetails)){
            throw new CustomAuthenticationException("사용자 인증 다시 해주세요.");
        }
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        int userId = customUserDetails.getUserId();

        List<UserInviteDto> usersList = dto.getList();
        GroupEntity groupEntity = groupRepository.findByGroupId(dto.getGroupId());
        if(groupEntity == null) throw new GroupNotFoundException();

        usersList.stream().forEach(user -> {
            UserEntity userEntity = userRepository.findByUserId(user.getUserId());

            GroupMemberId groupMemberId = new GroupMemberId(dto.getGroupId(), user.getUserId());

            GroupMemberEntity entity = new GroupMemberEntity();
            entity.setGroupEntity(groupEntity);
            entity.setUserEntity(userEntity);
            entity.setId(groupMemberId);

            groupMemberRepository.save(entity);

            // 그룹 초대 알림 보내기 ( 그룹 만든 사람 뺴고 보내기 )
            if(user.getUserId() != userId) {
                NotificationCreateRequestDto ncrDto = new NotificationCreateRequestDto();
                ncrDto.setCommonCodeId(101);
                ncrDto.setReceivingMemberId(user.getUserId());
                ncrDto.setLink("https://");
                ncrDto.setGroupName(groupEntity.getGroupName());

                notificationService.create(ncrDto);
            }
        });

        return GroupMemberCreateResponseDto.success();
    }

    @Override
    @Transactional
    public ResponseEntity<? super GroupListByUserResponseDto> groupListByUser() {

        List<GroupDto> list = new ArrayList<>();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null || !(authentication.getPrincipal() instanceof CustomUserDetails)){
            throw new CustomAuthenticationException("사용자 인증 다시 해주세요.");
        }
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        int userId = customUserDetails.getUserId();

        List<GroupEntity> entityList = groupMemberRepository.findGroupsByUserId(userId);

        entityList.stream().forEach(e -> {
            GroupDto dto = new GroupDto();
            dto.setGroupId(e.getGroupId());
            dto.setGroupname(e.getGroupName());
            dto.setInvitationLink(e.getInvitationLink());
            dto.setEndDate(e.getEndDate());
            dto.setCreateAt(e.getCreatedAt());

            UserEntity userEntity = userRepository.findByUserId(e.getCreatedBy());
            dto.setCreatedBy(userEntity.getUserName());

            list.add(dto);
        });

        return GroupListByUserResponseDto.success(list);
    }

    @Override
    @Transactional
    public ResponseEntity<? super GroupUserListResponseDto> userListByGroup(int groupId) {
        List<UserDto> list = new ArrayList<>();

        List<UserEntity> userEntityList = groupMemberRepository.findUsersByGroupId(groupId);

        userEntityList.stream().forEach(e -> {
            UserDto dto = new UserDto();
            dto.setUserName(e.getUserName());
            dto.setEmail(e.getEmail());

            list.add(dto);
        });

        return GroupUserListResponseDto.success(list);
    }
}
