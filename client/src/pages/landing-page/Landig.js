import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Image,
    VStack,
    Text,
    FormControl,
    Input,
    Stack,
    Radio,
    RadioGroup,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
    // const { isOpen, onOpen, onClose } = useDisclosure();
    // 만약 api연결한다면 회원가입 버튼을 눌렀을때 같은 아이디가 db에 있는지 이메
    // 이메일 형식이 맞는지 조건을 걸어줘야함
    // 그리고 state 값 axios로 회원가입 할 때 보내줘야함

    const [state, setstate] = useState({
        user_name: "",
        email: "",
        birth: "",
        sex: "",
    });

    const handleChangeState = (e) => {
        setstate({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate("/CreateGroup");
    };

    const {
        isOpen: LoginisOpen,
        onOpen: LoginonOpen,
        onClose: LoginonClose,
    } = useDisclosure();
    const {
        isOpen: FormisOpen,
        onOpen: FormonOpen,
        onClose: FormonClose,
    } = useDisclosure();

    const handleLogintoForm = () => {
        LoginonClose(); // 첫 번째 모달 닫기
        FormonOpen(); // 두 번째 모달 열기
    };

    return (
        <div className="Landing">
            <img src="/logo.png" alt="logoImg" />
            <p className="LandigTitle">"세상에 나쁜 흡연자는 없다!"</p>
            <p>
                알아요, 누구나 흡연이 건강에 안 좋다는 것을 머리로는 알지만 참
                참기 힘들다는 것을,
                <br />
                하지만, 함께라면 이겨낼 수 있지 않을까요?
                <br />
                우리 오늘부터, 함께 금연 생활을 시작해 봐요
                <br />
            </p>
            <Button onClick={LoginonOpen}>시작하기</Button>

            {/* Login */}
            <Modal isOpen={LoginisOpen} onClose={LoginonClose} isCentered>
                <ModalOverlay />
                <ModalContent width="sm" p={5} mx="auto" my="auto">
                    <ModalHeader> </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            mx="auto"
                            my={4}
                            boxSize="70%"
                        />
                        <VStack spacing={4}>
                            <Text mb={3}>소셜 ID로 시작하기</Text>
                            <Button
                                colorScheme="yellow"
                                size="md"
                                w="full"
                                onClick={handleLogintoForm}
                            >
                                카카오톡으로 로그인
                            </Button>
                            <Button colorScheme="blue" size="md" w="full">
                                구글 아이디로 로그인
                            </Button>
                            {/* 다른 소셜 로그인 버튼들 추가 */}
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/* Form */}
            <Modal isOpen={FormisOpen} onClose={FormonClose} isCentered>
                <ModalOverlay />
                <ModalContent width="md" p={5} mx="auto" my="auto">
                    <ModalHeader> </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            mx="auto"
                            my={4}
                            boxSize="70%"
                        />
                        <VStack spacing={4}>
                            <Text mb={3}>소셜 ID로 시작하기</Text>

                            <FormControl>
                                <Input
                                    mb={3}
                                    placeholder="이름"
                                    name="user_name"
                                    value={state.user_name}
                                    onChange={handleChangeState}
                                />
                                <Input
                                    mb={3}
                                    placeholder="이메일"
                                    name="email"
                                    value={state.email}
                                    onChange={handleChangeState}
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

export default Landing;
