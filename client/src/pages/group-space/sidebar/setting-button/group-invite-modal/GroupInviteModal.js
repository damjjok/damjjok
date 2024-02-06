import { CopyIcon } from "@chakra-ui/icons";
import {
    Alert,
    AlertIcon,
    Box,
    Flex,
    Heading,
    IconButton,
    MenuItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    SlideFade,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import SearchBar from "pages/landing-page/create-group/create-group-modal/searchbar/SearchBar";
import { useClipboard } from "@chakra-ui/react";

// 초대코드는 임의대로?
// API에 입력 API는 있는데, 생성 API는 없음

function GroupInviteModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const inviteCode = "초대 코드";
    const { hasCopied, onCopy } = useClipboard(inviteCode);

    return (
        <>
            <MenuItem onClick={onOpen}>멤버 초대하기</MenuItem>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <p className=" font-extrabold">멤버 초대하기</p>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody py={10} px={5}>
                        <Heading size="md" textAlign={"center"}>
                            친구를 찾아보세요!
                        </Heading>
                        <Box px={6}>
                            <SearchBar />
                        </Box>
                        <Heading size="md" textAlign={"center"}>
                            주변 친구를 초대하세요!
                        </Heading>
                        <Box>
                            <Flex
                                my={4}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Text
                                    as="u"
                                    mr={4}
                                    onClick={onCopy}
                                    cursor={"pointer"}
                                >
                                    {inviteCode}
                                </Text>
                                <IconButton>
                                    <CopyIcon onClick={onCopy} />
                                </IconButton>
                            </Flex>
                            {hasCopied ? (
                                <SlideFade in={onCopy} offsetY={"20px"}>
                                    <Alert status="success">
                                        <AlertIcon />
                                        초대 링크가 복사되었습니다!
                                    </Alert>
                                </SlideFade>
                            ) : (
                                ""
                            )}
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default GroupInviteModal;
