package com.ssafy.server.service.implement;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.server.entity.CustomOAuth2User;
import com.ssafy.server.entity.UserEntity;
import com.ssafy.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class OAuth2UserServiceImpl extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(request);
        // 위의 상태에서 들어오는 애가 kakao, naver 인지 구분해야함
        String oauthClientName = request.getClientRegistration().getClientName();



        try{
            // 아래 kakao, naver 에서 제공하는 사용자 정보가 찍힘
            System.out.println(new ObjectMapper().writeValueAsString(oAuth2User.getAttributes()));

        } catch (Exception exception){
            exception.printStackTrace();
        }

        UserEntity userEntity = null;
        String email = "email@email.com";
        String userName = "tt";

        if (oauthClientName.equals("kakao")){
            userEntity = new UserEntity(email,userName);
        }

//        if(oauthClientName.equals("naver")){
//            Map<String, String> responseMap =(Map<String, String>) oAuth2User.getAttributes().get("response");
//            userId = "naver_" + responseMap.get("id").substring(0,14);
//            email = responseMap.get("email");
//            userEntity = new UserEntity(userId,email,"naver");
//        }

        //userRepository.save(userEntity);

        return new CustomOAuth2User(email);
        // 반화해주는 값에 사용자의 정보 추가
        // OAuth2User 인터페이스를 우리만의 것으로 다시 만듬
    }
}