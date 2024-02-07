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
import { useRecoilValue } from "recoil";
import { currentGroupState } from "contexts/Group";

// 초대코드는 임의대로?
// API에 입력 API는 있는데, 생성 API는 없음

function GroupInviteModal({ currentGroupInfo }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    // const currentGroupInfo = useRecoilValue(currentGroupState);
    // console.log(currentGroupInfo);
    const inviteLink = currentGroupInfo.invitationLink;
    const { hasCopied, onCopy } = useClipboard(inviteLink);

    return (
        <>
            <MenuItem onClick={onOpen}>멤버 초대하기</MenuItem>

            {isOpen && (
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            <p className="font-extrabold">멤버 초대하기</p>
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
                                        {inviteLink}
                                    </Text>
                                    <IconButton>
                                        <CopyIcon onClick={onCopy} />
                                    </IconButton>
                                </Flex>
                                {hasCopied && (
                                    <SlideFade in={onCopy} offsetY={"20px"}>
                                        <Alert status="success">
                                            <AlertIcon />
                                            초대 링크가 복사되었습니다!
                                        </Alert>
                                    </SlideFade>
                                )}
                            </Box>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </>
    );
}

export default GroupInviteModal;
