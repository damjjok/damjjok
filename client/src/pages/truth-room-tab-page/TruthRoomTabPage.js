import { Box, Button, Flex, Text, Wrap, useDisclosure, useToast } from "@chakra-ui/react";
import { getScheduleByChallengeId, postSchedule } from "apis/api/Schedule";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TruthRoomEnterModal from "./modal/TruthRoomEnterModal";
import TruthRoomTabImg from "assets/images/truth-room-tab-img.png";
import { useRecoilValue } from "recoil";
import { currentUser } from "contexts/User";
import { challengeState } from "contexts/Challenge";
import TruthRoomScheduleModal from "./modal/TruthRoomScheduleModal";

function TruthRoomTabPage() {
    const { groupId, challengeId } = useParams();
    const challenge = useRecoilValue(challengeState);
    const user = useRecoilValue(currentUser);
    const toast = useToast();
    const [schedule, getSchedule] = useState({
        date: "",
    });

    const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const settingBtnClickHandler = async (date) => {
        console.log("asdjklasdjkalsdjklasdjkl");
        const result = await postSchedule(challengeId, date);
        if (result) {
            toast({
                title: "일정 등록 완료",
                description: "진실의 방을 예약했습니다!",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } else {
            console.log("등록실패!");
            toast({
                title: "일정 등록 실패",
                description: "지금은 진실의 방을 열수 없습니다.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }

        await getScheduleByChallengeId(challengeId, getSchedule);
        onCloseScheduleModal();
    };

    useEffect(() => {
        getScheduleByChallengeId(challengeId, getSchedule);
    }, [challengeId]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { isOpen: isOpenScheduleModal, onOpen: onOpenScheduleModal, onClose: onCloseScheduleModal } = useDisclosure();

    return (
        <>
            <Flex justifyContent={"center"} flexDirection={"column"} alignItems={"center"}>
                <Box
                    width={"100%"}
                    height={"35vh"}
                    bg={"dam.gray"}
                    marginTop={"5%"}
                    borderRadius={"30px"}
                    backgroundImage={TruthRoomTabImg}
                    backgroundSize={"100% 100%"}
                    backgroundPosition={"top center"}
                >
                    <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"} height={"100%"}>
                        {user.userId != challenge.userId && (
                            <Text fontWeight={"700"} fontSize={"1.5rem"} color={"white"}>
                                담쪽이가 일정을 정하고 있습니다.
                            </Text>
                        )}

                        {schedule && (
                            <Box paddingBottom={"12%"} textAlign={"center"}>
                                <Text fontWeight={"700"} fontSize={"1.5rem"} color={"dam.white"}>
                                    {new Date(schedule ? schedule.date : "").toLocaleDateString()}
                                </Text>
                                <Text fontWeight={"700"} fontSize={"1.5rem"} color={"red"}>
                                    {challenge.userName} 진실의 방으로.
                                </Text>
                            </Box>
                        )}
                        {!schedule && user.userId == challenge.userId && (
                            <>
                                <Text fontWeight={"700"} fontSize={"1.5rem"} color={"white"}>
                                    진실의 방 예약하기
                                </Text>
                                <Button bg={"dam.yellow"} size={"lg"} borderRadius={"30px"} onClick={onOpenScheduleModal}>
                                    일정 등록하기
                                </Button>
                            </>
                        )}
                    </Flex>
                </Box>
                <Wrap>
                    {schedule && new Date(schedule ? schedule.date : "").toLocaleDateString() === today.toLocaleDateString() && (
                        <Button bg={"dam.yellow"} marginTop={"10%"} size={"lg"} onClick={onOpen} borderRadius={"30px"}>
                            진실의 방 입장하기
                        </Button>
                    )}
                </Wrap>
            </Flex>

            <TruthRoomEnterModal isOpen={isOpen} onClose={onClose} groupId={groupId} challengeId={challengeId}></TruthRoomEnterModal>
            <TruthRoomScheduleModal isOpen={isOpenScheduleModal} onClose={onCloseScheduleModal} handler={settingBtnClickHandler}></TruthRoomScheduleModal>
        </>
    );
}

export default TruthRoomTabPage;
