import {
    Input,
    Text,
    VStack,
    HStack,
    Wrap,
    Tag,
    WrapItem,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { myFriendState } from "contexts/Search";
import { searchUserByEmail } from "apis/api/Group";

const SearchBar = () => {
    const [email, setEmail] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const [myfriend, setMyFriend] = useRecoilState(myFriendState);
    // 사용자가 입력할 때마다 호출되는 함수
    const handleChange = async (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        // 영어 한 글자 한 글자 입력될 때마다 API 요청을 보냅니다.
        if (newEmail) {
            const results = await searchUserByEmail(newEmail);
            setSearchResults(results);
        } else {
            setSearchResults([]); // 입력값이 없을 때는 검색 결과를 비웁니다.
        }
    };

    // API 요청 후 사용자 선택 시
    const handleSelectUser = (user) => {
        // 이미 선택된 이메일은 추가하지 않습니다.
        if (
            !myfriend.some((selectedUser) => selectedUser.email === user.email)
        ) {
            setMyFriend([...myfriend, user]);
            console.log(myfriend);
        }
    };
    // 사용자 제거 처리
    const handleRemoveUser = (email) => {
        setMyFriend(myfriend.filter((user) => user.email !== email));
    };

    useEffect(() => {
        console.log(myfriend); // myfriend 상태가 변경될 때마다 실행됩니다.
    }, [myfriend]); // 의존성 배열에 myfriend를 추가하여 myfriend 상태가 변경될 때마다 useEffect가 실행되도록 합니다.

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
                    borderBottom: "2px solid #ffd110",
                    boxShadow: "none",
                }}
                value={email}
                onChange={handleChange}
            />
            {/* 선택된 이름들을 태그로 표시합니다. */}
            <Wrap mt={2}>
                {myfriend.map((user, index) => (
                    <WrapItem key={index}>
                        <Tag
                            size="lg"
                            borderRadius="full"
                            variant="solid"
                            colorScheme="yellow"
                            onClick={() => handleRemoveUser(user.email)}
                        >
                            {user.userName}
                            <Text ml={2} cursor="pointer">
                                ×
                            </Text>
                            {/* 태그에서 이름을 제거하는 'x' 아이콘 */}
                        </Tag>
                    </WrapItem>
                ))}
            </Wrap>
            <VStack
                p={4}
                bg="white"
                boxShadow="sm"
                maxH="200px"
                overflowY="auto"
                spacing={0}
            >
                {searchResults.map((result, index) => (
                    <HStack
                        p={3}
                        key={index}
                        w="full"
                        justifyContent="space-between"
                        cursor="pointer"
                        onClick={() =>
                            handleSelectUser({
                                userName: result.userName,
                                email: result.email,
                                userId: result.userId,
                            })
                        }
                        _hover={{
                            bg: "rgba(255,209,0, 0.4)",
                            transition: "all 0.5s",
                        }}
                        borderRadius="10px"
                    >
                        <Text fontSize="lg">{result.userName}</Text>
                        <Text fontSize="lg">{result.email}</Text>
                    </HStack>
                ))}
            </VStack>
        </>
    );
};

export default SearchBar;
