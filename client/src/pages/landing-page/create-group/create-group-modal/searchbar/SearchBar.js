import {
    Input,
    Text,
    VStack,
    HStack,
    Wrap,
    Tag,
    WrapItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

const SearchBar = () => {
    const [email, setEmail] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedNames, setSelectedNames] = useState([]); // 선택된 이름들을 저장할 상태
    // 사용자가 입력할 때마다 호출되는 함수
    const handleChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        // 영어 한 글자 한 글자 입력될 때마다 API 요청을 보냅니다.
        if (newEmail) {
            searchUserByEmail(newEmail);
        } else {
            setSearchResults([]); // 입력값이 없을 때는 검색 결과를 비웁니다.
        }
    };

    // API 요청을 수행하는 함수
    const searchUserByEmail = async (email) => {
        try {
            const response = await axios.get(
                `https://i10e105.p.ssafy.io/api/v1/group/search-user/${email}`,
            );
            setSearchResults(response.data.list);
            console.log(searchResults);
        } catch (error) {
            console.error(error); // 에러 처리
            setSearchResults([]); // 에러가 발생하면 검색 결과를 비웁니다.
        }
    };

    const handleSelectName = (userName) => {
        // 이미 선택된 이름은 추가하지 않습니다.
        if (!selectedNames.includes(userName)) {
            setSelectedNames([...selectedNames, userName]);
        }
    };
    const handleRemoveName = (name) => {
        setSelectedNames(
            selectedNames.filter((selectedName) => selectedName !== name),
        );
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
                    borderBottom: "2px solid #ffd110",
                    boxShadow: "none",
                }}
                value={email}
                onChange={handleChange}
            />
            {/* 선택된 이름들을 태그로 표시합니다. */}
            <Wrap mt={2}>
                {selectedNames.map((name, index) => (
                    <WrapItem key={index}>
                        <Tag
                            size="lg"
                            borderRadius="full"
                            variant="solid"
                            colorScheme="yellow"
                            onClick={() => handleRemoveName(name)}
                        >
                            {name}
                            <Text ml={2} cursor="pointer">
                                ×
                            </Text>{" "}
                            {/* 태그에서 이름을 제거하는 'x' 아이콘 */}
                        </Tag>
                    </WrapItem>
                ))}
            </Wrap>
            <VStack
                mt={2}
                p={4}
                bg="white"
                boxShadow="sm"
                maxH="200px"
                overflowY="auto"
                spacing={5}
            >
                {searchResults.map((result, index) => (
                    <HStack
                        key={index}
                        w="full"
                        justifyContent="space-between"
                        cursor="pointer"
                        onClick={() => handleSelectName(result.userName)}
                        _hover={{ bg: "#fde336" }}
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
