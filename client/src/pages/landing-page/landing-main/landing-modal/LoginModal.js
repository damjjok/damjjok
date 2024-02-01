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
        </div>
    );
};

export default LoginModal;
