import { Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

const SearchBar = () => {
    const [email, setEmail] = useState("");
    // 사용자가 입력할 때마다 호출되는 함수
    const handleChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        // 영어 한 글자 한 글자 입력될 때마다 API 요청을 보냅니다.
        if (newEmail) {
            searchUserByEmail(newEmail);
        }
    };

    // API 요청을 수행하는 함수
    const searchUserByEmail = async (email) => {
        try {
            const response = await axios.get(
                `https://i10e105.p.ssafy.io/api/v1/group/search-user/${email}`,
            );
            console.log(response.data); // 여기서 검색 결과를 처리합니다.
        } catch (error) {
            console.error(error); // 에러 처리
        }
    };

    return (
        <>
            {" "}
            <Text mt={10} fontSize="m" textAlign="center">
                이미 가입된 친구가 있으신가요?
            </Text>
            <Input
                variant="flushed"
                mb={3}
                placeholder="이메일 주소"
                _focus={{
                    borderBottom: "2px solid #ffd110", // 포커스 시 선 색상 변경
                    boxShadow: "none", // 기본 테마의 포커스 boxShadow 제거
                }}
                value={email}
                onChange={handleChange}
            />
        </>
    );
};

export default SearchBar;
