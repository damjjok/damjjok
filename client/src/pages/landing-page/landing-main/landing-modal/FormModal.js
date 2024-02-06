import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    Image,
    VStack,
    Text,
    FormControl,
    Input,
    Stack,
    Radio,
    RadioGroup,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "assets/images/logo.png";
import { useRecoilState } from "recoil";
import { userState } from "contexts/Sns";
import axios from "axios";

const FormModal = ({ FormisOpen, FormonClose }) => {
    const [user, setUser] = useRecoilState(userState);

    const [state, setstate] = useState({
        user_name: "",
        email: "",
        birth: "",
        sex: "",
    });

    // 컴포넌트 마운트 시 전역 상태 값을 로컬 상태에 할당
    useEffect(() => {
        setstate((prevState) => ({
            ...prevState,
            user_name: user.name || "", // 전역 상태의 name, email 사용
            email: user.email || "",
        }));
    }, [user]); // user 상태가 변경될 때마다 업데이트

    const handleChangeState = (e) => {
        setstate({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            // 1. axios를 사용해서 API에 데이터 POST 요청
            const response = await axios.post(
                "https://i10e105.p.ssafy.io/api/v1/auth/sign-up",
                {
                    name: state.user_name,
                    email: state.email,
                    birth: state.birth,
                    sex: state.sex,
                },
            );

            console.log(response.data); // 응답 로그 출력

            // 2. 전역변수 user의 name과 email 삭제
            setUser((prevUser) => ({ ...prevUser, name: "", email: "" }));

            FormonClose();
            // 3. 랜딩 페이지로 리디렉션
            navigate("/");
        } catch (error) {
            console.error("회원가입 실패:", error);
            // 에러 처리 로직 추가...
        }
    };

    return (
        <div className="FormModal">
            <Modal isOpen={FormisOpen} onClose={FormonClose} isCentered>
                <ModalOverlay />
                <ModalContent width="md" p={5} mx="auto" my="auto">
                    <ModalHeader> </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Image
                            src={logo}
                            alt="Logo"
                            mx="auto"
                            my={4}
                            boxSize="70%"
                        />
                        <VStack spacing={4}>
                            <Text mb={3} mt={4} fontSize="md" fontWeight="bold">
                                소셜 ID로 시작하기
                            </Text>

                            <FormControl>
                                <Input
                                    mb={3}
                                    placeholder="이름"
                                    name="user_name"
                                    value={state.user_name}
                                    onChange={handleChangeState}
                                    isReadOnly
                                />
                                <Input
                                    mb={3}
                                    placeholder="이메일"
                                    name="email"
                                    value={state.email}
                                    onChange={handleChangeState}
                                    isReadOnly
                                />
                                <Input
                                    mb={3}
                                    placeholder="생년월일"
                                    name="birth"
                                    value={state.birth}
                                    onChange={handleChangeState}
                                />

                                <RadioGroup
                                    defaultValue="male"
                                    name="sex"
                                    value={state.sex}
                                    onChange={(value) =>
                                        setstate({ ...state, sex: value })
                                    }
                                >
                                    <Stack
                                        direction="row"
                                        justifyContent="center"
                                        mb={3}
                                    >
                                        <Radio value="male">남성</Radio>
                                        <Radio value="female">여성</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>

                            <Button
                                colorScheme="yellow"
                                size="md"
                                w="full"
                                onClick={handleSignUp}
                            >
                                회원가입
                            </Button>

                            {/* 다른 소셜 로그인 버튼들 추가 */}
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default FormModal;
