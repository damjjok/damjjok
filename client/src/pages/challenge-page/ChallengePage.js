import { Tabs, TabList, TabPanels, Tab, TabPanel, Modal, ModalOverlay, ModalContent, ModalBody, VStack, Box, useBreakpointValue } from "@chakra-ui/react";
import HomeTabPage from "../home-tab-page/HomeTabPage";
import TruthRoomTabPage from "../truth-room-tab-page/TruthRoomTabPage";
import RewardTabPage from "../reward-tab-page/RewardTabPage";
import StatusBar from "./status-bar/StatusBar";
import ProofTabPage from "../proof-tap-page/ProofTabPage";
import React, { useEffect, useState } from "react";
import MessageCheckModal from "./modal/completed-modal/message-check-modal/MessageCheckModal";
import ChallengeCompletedModal from "./modal/completed-modal/ChallengeCompletedModal";
import BestCheerMemberModal from "./modal/completed-modal/best-cheer/BestCheerMemberModal";
import ChallengeReport from "./modal/completed-modal/challenge-report/ChallengeReport";
import PiggyBankFinished from "./modal/completed-modal/piggy-bank/PiggyBankFinished";
import TitleText from "components/TitleText";
import bgHomeTab from "assets/images/bgHomeTab.png";
import bgArticleTab from "assets/images/bgArticleTab.jpg";
import bgRoomofTruth from "assets/images/bgRoomofTruth.jpg";
import bgRewardTab from "assets/images/bgRewardTab.jpg";
import { useRecoilState, useRecoilValue } from "recoil";
import { challengeState } from "contexts/Challenge";
import { useParams } from "react-router-dom";
import { getChallengeInfo } from "apis/api/Challenge";
import { currentUser } from "contexts/User";
import ChallengeTabs from "./ChallengeTabs";

function ChallengePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contentStep, setContentStep] = useState(0);
    const { groupId, challengeId } = useParams();

    const [currentChallenge, setCurrentChallenge] = useRecoilState(challengeState);

    const loginedUser = useRecoilValue(currentUser);
    const isMobile = useBreakpointValue({ base: true, md: false });

    let today = new Date();
    const startedDate = new Date(currentChallenge.createdAt);

    // 두 날짜 사이의 밀리초 차이를 계산합니다.
    const diffMilliseconds = today.getTime() - startedDate.getTime();
    const diffDays = Math.floor(diffMilliseconds / (24 * 60 * 60 * 1000));

    useEffect(() => {
        if (
            currentChallenge.userId === loginedUser.userId &&
            // 챌린지 기한이 diffDays와 같아질 때
            currentChallenge.duration === diffDays
        ) {
            setIsModalOpen(true);
        } else {
            setIsModalOpen(false);
        }
    }, [currentChallenge]);

    const nextContent = () => setContentStep(contentStep + 1);
    const closeModal = () => {
        setIsModalOpen(false);
        setContentStep(0); // 모달을 닫을 때는 내용 단계를 초기화
    };
    const contents = [
        <ChallengeCompletedModal nextContent={nextContent} />,
        <MessageCheckModal nextContent={nextContent} />,
        <BestCheerMemberModal nextContent={nextContent} />,
        <ChallengeReport nextContent={nextContent} />,
        <PiggyBankFinished nextContent={nextContent} />,
    ];

    // 현재 선택된 탭의 인덱스를 상태로 추적
    // 1. Create the component

    // 3. Pass the props and chill!
    return (
        <>
            <VStack justifyContent={"center"} alignItems={"center"}>
                <StatusBar />
                <ChallengeTabs></ChallengeTabs>

                {/* <DataTabs data={tabData} /> */}
            </VStack>
            <Modal isOpen={isModalOpen} onClose={closeModal} closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent maxW={isMobile ? "100vw" : "1000px"} margin={"auto"}>
                    <ModalBody paddingY={20}>{contents[contentStep]}</ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ChallengePage;
