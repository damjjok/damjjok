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
    useToast,
    Alert,
    AlertIcon,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "assets/images/logo.png";
import { useRecoilState } from "recoil";
import { dontTouchSnsLoginInfo } from "contexts/Sns";
import axios from "axios";

const FormModal = ({ FormisOpen, FormonClose }) => {
    const [snsLoginInfo, setSnsLoginInfo] = useRecoilState(
        dontTouchSnsLoginInfo,
    );

    const [state, setstate] = useState({
        user_name: "",
        email: "",
        birth: "",
        sex: "",
    });

    const toast = useToast();

    // 컴포넌트 마운트 시 전역 상태 값을 로컬 상태에 할당
    useEffect(() => {
        setstate((prevState) => ({
            ...prevState,
            user_name: snsLoginInfo.name || "", // 전역 상태의 name, email 사용
            email: snsLoginInfo.email || "",
        }));
    }, [snsLoginInfo]); // user 상태가 변경될 때마다 업데이트

    const handleChangeState = (e) => {
        setstate({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const navigate = useNavigate();
    const [isFormValid, setIsFormValid] = useState(true); // 폼 유효성 상태

    const handleSignUp = async () => {
        // 필수 입력 필드가 비어 있는지 확인
        if (!state.user_name || !state.email || !state.birth || !state.sex) {
            setIsFormValid(false); // 유효성 검사 실패
            // 유효하지 않은 경우 여기서 함수를 종료하고 더 이상 진행하지 않음
            return;
        } else {
            setIsFormValid(true); // 유효성 검사 성공
        }

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
        } catch (error) {
            console.error("회원가입 실패:", error);
            // 에러 처리 로직 추가...
        }
        // 2. 전역변수 user의 name과 email 삭제
        setSnsLoginInfo((prevUser) => ({ ...prevUser, name: "", email: "" }));

        FormonClose();

        // 토스트 메시지 표시
        toast({
            title: "회원 가입 완료!",
            description: `로그인 버튼을 눌러주세요!`,
            status: "success",
            duration: 9000,
            isClosable: true,
        });
        // 3. 랜딩 페이지로 리디렉션
        navigate("/");
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
                                    variant="flushed"
                                    mb={3}
                                    placeholder="이름"
                                    name="user_name"
                                    value={state.user_name}
                                    onChange={handleChangeState}
                                    isReadOnly
                                    _focus={{
                                        borderBottom: "2px solid #ffd110", // 포커스 시 선 색상 변경
                                        boxShadow: "none", // 기본 테마의 포커스 boxShadow 제거
                                    }}
                                />
                                <Input
                                    variant="flushed"
                                    mb={3}
                                    placeholder="이메일"
                                    name="email"
                                    value={state.email}
                                    onChange={handleChangeState}
                                    isReadOnly
                                    _focus={{
                                        borderBottom: "2px solid #ffd110", // 포커스 시 선 색상 변경
                                        boxShadow: "none", // 기본 테마의 포커스 boxShadow 제거
                                    }}
                                />
                                <Input
                                    variant="flushed"
                                    mb={3}
                                    placeholder="생년월일 ex)19971231"
                                    name="birth"
                                    value={state.birth}
                                    onChange={handleChangeState}
                                    maxLength={8}
                                    _focus={{
                                        borderBottom: "2px solid #ffd110", // 포커스 시 선 색상 변경
                                        boxShadow: "none", // 기본 테마의 포커스 boxShadow 제거
                                    }}
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
                                        <Radio value="male" mr={5}>
                                            남성
                                        </Radio>
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
                        {!isFormValid && (
                            <Alert status="error" mt={4}>
                                <AlertIcon />
                                모든 필드를 채워주세요.
                            </Alert>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default FormModal;
