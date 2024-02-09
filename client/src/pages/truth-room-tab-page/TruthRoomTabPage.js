import {
    Box,
    Button,
    Flex,
    tepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
    Wrap,
    useDisclosure,
    NumberDecrementStepper,
} from "@chakra-ui/react";
import { getScheduleByChallengeId } from "apis/api/Schedule";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TruthRoomEnterModal from "./modal/TruthRoomEnterModal";
import TruthRoomTabImg from "assets/images/truth-room-tab-img.png";
import { useRecoilValue } from "recoil";
import { currentUserState } from "contexts/User";
import { challengeState } from "contexts/Challenge";
import TruthRoomScheduleModal from "./modal/TruthRoomScheduleModal";

function TruthRoomTabPage() {
    const { groupId, challengeId } = useParams();
    const challenge = useRecoilValue(challengeState);
    const user = useRecoilValue(currentUserState);
    const [schedule, getSchedule] = useState({
        date: "",
    });

    useEffect(() => {
        getScheduleByChallengeId(challengeId, getSchedule);
    }, []);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        isOpen: isOpenScheduleModal,
        onOpen: onOpenScheduleModal,
        onClose: onCloseScheduleModal,
    } = useDisclosure();
    return (
        <>
            <Flex
                justifyContent={"center"}
                flexDirection={"column"}
                alignItems={"center"}
            >
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
                    <Flex
                        flexDirection={"column"}
                        justifyContent={"space-around"}
                        alignItems={"center"}
                        height={"100%"}
                    >
                        {user.userId != challenge.userId && (
                            <Text
                                fontWeight={"700"}
                                fontSize={"1.5rem"}
                                color={"white"}
                            >
                                담쪽이가 일정을 정하고 있습니다.
                            </Text>
                        )}

                        {schedule.date && (
                            <Text
                                fontWeight={"700"}
                                fontSize={"1.5rem"}
                                color={"white"}
                            >
                                진실의 방 오픈 :
                                {new Date(
                                    schedule ? schedule.date : ""
                                ).toLocaleDateString()}
                            </Text>
                        )}

                        <Text
                            fontWeight={"700"}
                            fontSize={"1.5rem"}
                            color={"white"}
                        >
                            진실의 방 오픈일 설정
                        </Text>
                        <Button onClick={onOpenScheduleModal}>
                            일정 등록하기
                        </Button>
                    </Flex>
                </Box>
                <Wrap>
                    <Button
                        bg={"dam.yellow"}
                        marginTop={"10%"}
                        size={"lg"}
                        onClick={onOpen}
                        borderRadius={"30px"}
                    >
                        진실의 방 입장하기
                    </Button>
                </Wrap>
            </Flex>

            <TruthRoomEnterModal
                isOpen={isOpen}
                onClose={onClose}
                groupId={groupId}
                challengeId={challengeId}
            ></TruthRoomEnterModal>
            <TruthRoomScheduleModal
                isOpen={isOpenScheduleModal}
                onClose={onCloseScheduleModal}
            ></TruthRoomScheduleModal>
        </>
    );
}

export default TruthRoomTabPage;
