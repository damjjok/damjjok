import { useLocation } from "react-router-dom";
import StatusBar from "./status-bar/StatusBar";
import HomeTab from "../group-tab/home-tab/HomeTab";
import TitleText from "components/TitleText";
import bgSucceedChallenge from "assets/images/bgSucceedChallenge.png";
import bgFailedChallenge from "assets/images/bgFailedChallenge.png";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import BasicButton from "components/button/BasicButton";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import postbox from "assets/images/postboxMain.png";
import messageBg from "assets/images/messageBg.png";
import { motion } from "framer-motion";
import WholeMessageList from "../group-tab/completed-modal/message-check-modal/WholeMessageList";
import MessageCheckModal from "../group-tab/completed-modal/message-check-modal/MessageCheckModal";

//더미 데이터
const messages = [
    {
        writer: "작성자1",
        content: "안녕잘지내니테스트용으로메시지를길게넣어보려고해",
    },
    { writer: "작성자2", content: "사실처음봤을때부터...더보기" },
    { writer: "작성자3", content: "이편지는영국에서시작되어..." },
    { writer: "작성자4", content: "[WEB발신] 너는 나를 존중해야 하고" },
    { writer: "작성자5", content: "메시지 5" },
    { writer: "작성자6", content: "메시지 6" },
    { writer: "작성자7", content: "메시지 7" },
    { writer: "작성자8", content: "메시지 8" },
    { writer: "작성자9", content: "메시지 9" },
];

function LastChallenge() {
    const location = useLocation();
    const challenge = location.state.challenge;
    const tabName =
        challenge.status === "success" ? "성공한 챌린지" : "실패한 챌린지";
    const description =
        challenge.status === "success"
            ? "이전에 성공한 챌린지 정보를 볼 수 있어요"
            : "이전에 실패한 챌린지 정보를 볼 수 있어요";
    const bgImage =
        challenge.status === "success" ? bgSucceedChallenge : bgFailedChallenge;
    const [isMessagesVisible, setIsMessagesVisible] = useState(false);
    const [displayCount, setDisplayCount] = useState(8); // 메시지 표시 개수 상태

    const handleClick = () => {
        setIsMessagesVisible(true);
    };
    const isExpired = "True";

    return (
        <>
            <VStack marginBottom={15}>
                <TitleText
                    fontSize="2rem"
                    img={bgImage}
                    description={description}
                >
                    {tabName}
                </TitleText>
                <StatusBar challenge={challenge} />
                <Box
                    display={"flex"}
                    flexFlow={"column"}
                    alignItems={"center"}
                    width={"70vw"}
                    overflowY={"auto"}
                    height="50vh"
                >
                    <HomeTab challengeId={challenge.challengeId} />
                    {challenge.status === "success" ? (
                        <>
                            <BasicButton
                                buttonName={"리워드 다시보기"}
                                variant={"bigbtn"}
                            />
                            <MessageCheckModal isExpired={isExpired} />
                        </>
                    ) : (
                        <></>
                    )}
                </Box>
            </VStack>
        </>
    );
}

export default LastChallenge;
