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
import { getGroupMember } from "apis/api/Group";
import damJJokIcon from "assets/images/damJJokIcon.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function GroupMemberModal() {
    const { groupId } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentGroupMember, setCurrentGroupMember] = useState([]);
    // const groupIdVal = Number(groupId);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const groupresponse = await getGroupInfo(grou);
                const response = await getGroupMember(groupId);
                // console.log(groupresponse);
                // const updatedGroupInfo = groupresponse.groupDto;
                // setCurrentGroupInfo(updatedGroupInfo);
                const updatedGroupMember = response.list;
                setCurrentGroupMember(updatedGroupMember); // Recoil 상태에 데이터 적용
                // console.log(updatedGroupMember);
            } catch (error) {
                console.error("챌린지 정보 불러오기 실패", error);
            }
        };
        console.log("그룹멤버 받아와라");

        fetchData(); // fetchData 함수 호출
    }, [groupId]);

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
