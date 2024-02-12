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
import SearchBar from "pages/group-list-page/search-bar/SearchBar";
import { useClipboard } from "@chakra-ui/react";
import { useEffect } from "react";
import { myFriendState } from "contexts/Search";
import { useRecoilValue, useResetRecoilState } from "recoil";
import BasicButton from "components/button/BasicButton";
import { joinGroup } from "apis/api/Group";

// 초대코드는 임의대로?
// API에 입력 API는 있는데, 생성 API는 없음

function GroupInviteModal({ currentGroupInfo }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { hasCopied, onCopy, setValue, value } = useClipboard("");

    useEffect(() => {
        if (!currentGroupInfo) return;
        const inviteLink =
            `https://i10e105.p.ssafy.io/invitation/` +
            currentGroupInfo.invitationLink;
        setValue(inviteLink);
    }, [currentGroupInfo]);

    const myfriend = useRecoilValue(myFriendState);
    const resetFriendListAtom = useResetRecoilState(myFriendState);

    useEffect(() => {
        // console.log(myfriend); // myfriend 상태가 변경될 때마다 실행됩니다.
    }, [myfriend]);

    const handleInviteUser = async () => {
        try {
            const userIdList = myfriend.map((friend) => friend.userId);
            console.log(currentGroupInfo.groupId);
            console.log(userIdList);
            const result = await joinGroup(
                currentGroupInfo.groupId,
                userIdList
            );
            resetFriendListAtom();
            alert("초대가 완료되었습니다");
        } catch (error) {
            console.log(error);
        }
    };

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
                            <Box
                                mb={14}
                                display={"flex"}
                                justifyContent={"center"}
                            >
                                <BasicButton
                                    buttonName={"초대하기"}
                                    onClick={() => handleInviteUser()}
                                />
                            </Box>
                            <Heading size="md" textAlign={"center"}>
                                주변 친구를 초대하세요!
                            </Heading>
                            <Box px={4}>
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
                                        {value}
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
