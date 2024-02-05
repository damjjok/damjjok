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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "assets/images/logo.png";

const FormModal = ({ FormisOpen, FormonClose }) => {
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
        navigate("/create-group");
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

export default FormModal;
