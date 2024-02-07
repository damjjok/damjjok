import {
    Box,
    Flex,
    MenuItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    VStack,
    useDisclosure,
} from "@chakra-ui/react";
import phDIcon from "assets/images/phDIcon.png";
import damJJokIcon from "assets/images/damJJokIcon.png";
import { useRecoilValue } from "recoil";
import { currentGroupMemberState } from "contexts/Group";

function GroupMemberModal({ currentGroupMember }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    // const currentGroupMember = useRecoilValue(currentGroupMemberState);

    // find 메서드로 담쪽이 찾기

    return (
        <>
            <MenuItem onClick={onOpen}>그룹원 보기</MenuItem>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <p className=" font-extrabold">그룹원 보기</p>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody py={10} px={20}>
                        <Box
                            display="flex"
                            flexFlow={"column"}
                            alignItems={"center"}
                            marginY={4}
                        >
                            <VStack alignItems={"start"} px={10}>
                                {currentGroupMember.map((member, index) => (
                                    <Box key={index} py={2}>
                                        <Flex alignItems={"center"}>
                                            <img
                                                src={damJJokIcon}
                                                alt="damJJokIcon"
                                                className="w-[30px] mr-2"
                                            />
                                            {member.userName}
                                        </Flex>
                                    </Box>
                                ))}
                            </VStack>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default GroupMemberModal;
