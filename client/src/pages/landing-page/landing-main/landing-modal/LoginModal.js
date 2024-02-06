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
} from "@chakra-ui/react";
import logo from "assets/images/logo.png";

const LoginModal = ({ LoginisOpen, LoginonClose, handleLogintoForm }) => {
    const handleNaverLogin = () => {
        window.location.href =
            "https://i10e105.p.ssafy.io/api/v1/auth/oauth2/naver";
    };

    return (
        <div className="LoginModal">
            <Modal isOpen={LoginisOpen} onClose={LoginonClose} isCentered>
                <ModalOverlay />
                <ModalContent width="sm" p={5} mx="auto" my="auto">
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
                            <Text mb={2} mt={4} fontWeight="bold" fontSize="md">
                                소셜 ID로 시작하기
                            </Text>
                            <Button
                                colorScheme="green"
                                size="md"
                                w="full"
                                onClick={handleNaverLogin}
                            >
                                네이버로 로그인
                            </Button>
                            <Button
                                colorScheme="yellow"
                                size="md"
                                w="full"
                                onClick={handleLogintoForm}
                            >
                                카카오톡으로 로그인
                            </Button>
                            <Button colorScheme="blue" size="md" w="full">
                                구글로 로그인
                            </Button>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default LoginModal;
