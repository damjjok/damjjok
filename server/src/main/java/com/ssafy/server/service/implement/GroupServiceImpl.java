package com.ssafy.server.service.implement;

import com.ssafy.server.dto.ResponseDto;
import com.ssafy.server.dto.auth.CustomUserDetails;
import com.ssafy.server.dto.group.GroupDto;
import com.ssafy.server.dto.group.UserDto;
import com.ssafy.server.dto.request.group.GroupCreateRequestDto;
import com.ssafy.server.dto.request.group.GroupMemberCreateRequestDto;
import com.ssafy.server.dto.response.group.*;
import com.ssafy.server.entity.GroupEntity;
import com.ssafy.server.entity.GroupMemberEntity;
import com.ssafy.server.entity.GroupMemberId;
import com.ssafy.server.entity.UserEntity;
import com.ssafy.server.exception.CustomJwtException;
import com.ssafy.server.provider.JwtProvider;
import com.ssafy.server.repository.GroupMemberRepository;
import com.ssafy.server.repository.GroupRepository;
import com.ssafy.server.repository.UserRepository;
import com.ssafy.server.service.GroupService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
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
    private final JwtProvider jwtProvider;

    @Override
    public ResponseEntity<? super GroupCreateResponseDto> create(GroupCreateRequestDto dto) {
        try{

            GroupEntity groupEntity = new GroupEntity();
            groupEntity.setGroupName(dto.getName());
            groupEntity.setCreatedBy(dto.getCreated_by());
            groupEntity.setCreatedAt(LocalDateTime.now());
            groupEntity.setEndDate(LocalDateTime.now().plusMonths(1));

            String invitationLink = UUID.randomUUID().toString();
            groupEntity.setInvitationLink(invitationLink);

            groupRepository.save(groupEntity);

        }catch (Exception e){
            e.printStackTrace();
            return GroupCreateResponseDto.databaseError();
        }
        return GroupCreateResponseDto.success();
    }

    @Override
    public ResponseEntity<? super GroupInviteResponseDto> validateInvitationLink(String invitationLink) {

        GroupEntity groupEntity = null;

        try {

            groupEntity = groupRepository.findByInvitationLink(invitationLink);

        }catch(Exception e){
            e.printStackTrace();
            return GroupCreateResponseDto.databaseError();
        }
        return GroupInviteResponseDto.sendGroupInfo(groupEntity.getGroupId());
    }

    @Override
    public ResponseEntity<? super GroupDetailResponseDto> groupDetail(int groupId) {

        GroupDto groupDto = new GroupDto();

        try{

            GroupEntity groupEntity = groupRepository.findByGroupId(groupId);

            groupDto.setGroupId(groupEntity.getGroupId());
            groupDto.setGroupname(groupEntity.getGroupName());
            groupDto.setCreateAt(groupEntity.getCreatedAt());
            groupDto.setEndDate(groupEntity.getEndDate());

            UserEntity userEntity = userRepository.findByUserId(groupEntity.getCreatedBy());
            groupDto.setCreatedBy(userEntity.getUserName());
            groupDto.setInvitationLink(groupEntity.getInvitationLink());

        }catch(Exception e){
            return ResponseDto.databaseError();
        }
        return GroupDetailResponseDto.success(groupDto);
    }

    @Override
    public ResponseEntity<? super GroupUserListResponseDto> userList(String email) {

        List<UserDto> list = new ArrayList<>();

        try{

            List<UserEntity> userEntityList = userRepository.findByEmailContaining(email);
//            System.out.println(userEntityList);

            userEntityList.stream().forEach(e -> {
                UserDto dto = new UserDto();
                dto.setUserId(e.getUserId());
                dto.setUserName(e.getUserName());
                dto.setEmail(e.getEmail());
                list.add(dto);
            });

        }catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GroupUserListResponseDto.success(list);
    }

    @Override
    public ResponseEntity<? super GroupMemberCreateResponseDto> joinGroupMember(GroupMemberCreateRequestDto dto) {
        try{

            GroupEntity groupEntity = groupRepository.findByGroupId(dto.getGroupId());
            UserEntity userEntity = userRepository.findByUserId(dto.getUserId());

            GroupMemberId groupMemberId = new GroupMemberId(dto.getGroupId(), dto.getUserId());

            GroupMemberEntity entity = new GroupMemberEntity();
            entity.setGroupEntity(groupEntity);
            entity.setUserEntity(userEntity);
            entity.setId(groupMemberId);

            groupMemberRepository.save(entity);

        }catch(Exception e){
            return ResponseDto.databaseError();
        }
        return GroupMemberCreateResponseDto.success();
    }

    @Override
    public ResponseEntity<? super GroupListByUserResponseDto> groupListByUser() {

        List<GroupDto> list = new ArrayList<>();

        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

//            String token = authorizationHeader.substring(7);
//            Jws<Claims> parsedToken = jwtProvider.validateToken(token);
//
//            String email = parsedToken.getBody().get("email", String.class);
//            int userId = parsedToken.getBody().get("userId", Integer.class);
//            String userName = parsedToken.getBody().get("userName", String.class);

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

//        }catch (Exception e){
//            return ResponseDto.databaseError();
//        }
        }catch (ExpiredJwtException e) { // 액세스 토큰 만료 시
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        } catch (UnsupportedJwtException | SignatureException | MalformedJwtException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        } catch (CustomJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        return GroupListByUserResponseDto.success(list);
    }

    @Override
    public ResponseEntity<? super GroupUserListResponseDto> userListByGroup(int groupId) {
        List<UserDto> list = new ArrayList<>();
        try{

            List<UserEntity> userEntityList = groupMemberRepository.findUsersByGroupId(groupId);

            userEntityList.stream().forEach(e -> {
                UserDto dto = new UserDto();
                dto.setUserName(e.getUserName());
                dto.setEmail(e.getEmail());

                list.add(dto);
            });

        }catch (Exception e){
            return ResponseDto.databaseError();
        }
        return GroupUserListResponseDto.success(list);
    }
}
