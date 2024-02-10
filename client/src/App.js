//App.js

import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
// import GroupHome from "./pages/groupspace/group-home/GroupHome.js";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Suspense, useEffect } from "react";
import LandingPage from "./pages/landing-page/LandigPage.js";
import GroupListPage from "./pages/group-list-page/GroupListPage.js";
import GroupSpacePage from "./pages/group-space-page/GroupSpacePage.js";
import TruthRoom from "pages/truth-room/TruthRoom";
import HomeTabPage from "pages/home-tab-page/HomeTabPage";
import ProofTabPage from "pages/proof-tap-page/ProofTabPage";
import ChallengePage from "pages/challenge-page/ChallengePage";
import CreateChallengePage from "pages/create-challenge-page/CreateChallengePage";
import EmptyChallengePage from "pages/empty-challenge-page/EmptyChallengePage";
import LastChallengePage from "pages/last-challenge-page/LastChallengePage";
import { createGlobalStyle } from "styled-components";
import OauthPage from "pages/oauth-page/OauthPage";
import "./util/firebase/firebaseConfig";

import { getMessaging, onMessage } from "firebase/messaging";
import { getNotificationList } from "apis/api/Notification";
import { notificationListState } from "contexts/Notification";
import firebaseApp from "./util/firebase/firebaseConfig";
import ConnectionTest from "pages/truth-room/openvidu/ConnectionTest";
import GroupSpaceMain from "pages/group-space-page/group-space-main/GroupSpaceMain";

const GlobalStyle = createGlobalStyle`
  * {
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-track {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: gray;
      borderRadius: 24px;
    }
  }
`;

const theme = extendTheme({
    colors: {
        dam: {
            yellow: "#FFD100",
            lightgray: "#D6D6D6",
            gray: "#D9D9D9",
            black: "#202020",
            white: "#FFFFFF",
        },
        yellow: {
            50: "#FFFFE0",
            100: "#FFFACD",
            200: "#FAFAD2",
            300: "#FFEFD5",
            400: "#FFE4B5",
            500: "#FFD700",
            600: "#FFD100",
            700: "#FFC125",
            800: "#FFB90F",
            900: "#FFA500",
        },
    },
    // 라디오 버튼때문에 추가
    components: {
        Radio: {
            baseStyle: (props) => ({
                control: {
                    borderRadius: "none", // 네모난 모양으로 변경
                    _checked: {
                        bg: "#ffd110", // 체크될 때의 배경색상
                        borderColor: "#ffd110", // 체크될 때의 테두리 색상
                        color: "white", // 체크될 때 내부 아이콘(체크 표시) 색상

                        _hover: {
                            bg: "yellow.400", // 호버 시 배경 색상 조정
                            borderColor: "yellow.400", // 호버 시 테두리 색상 조정
                        },
                    },
                },
            }),
        },
    },
});

function App() {
    // const [notificationList, setNotificationList] = useRecoilState(
    //     notificationListState
    // );

    const setNotificationList = useSetRecoilState(notificationListState);

    const fetchNotifications = async () => {
        const list = await getNotificationList();
        setNotificationList(list);
    };
    useEffect(() => {
        const messaging = getMessaging(firebaseApp);
        onMessage(messaging, (payload) => {
            console.log("Message received. ", payload);
            // 여기서 포그라운드 알림을 처리할 로직을 구현합니다.
            // 예를 들어, 사용자에게 메시지를 표시하는 다이얼로그나 알림을 띄울 수 있습니다.
            // if (Notification.permission === "granted") {
            //     new Notification(payload.data.title, {
            //         body: payload.data.body,
            //         icon: "/firebase-logo.png", // 알림에 표시할 아이콘
            //     });
            // }
            fetchNotifications();
        });
    }, []);
    return (
        <>
            <GlobalStyle />
            <Suspense>
                <ChakraProvider theme={theme}>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/group-list" element={<GroupListPage />} />
                        <Route
                            path={`/group/:groupId`}
                            element={<GroupSpaceMain />}
                        />
                        <Route
                            path={`/group/:groupId/*`}
                            element={<GroupSpacePage />}
                        >
                            <Route
                                path="create-challenge"
                                element={<CreateChallengePage />}
                            />
                            <Route
                                path="empty-challenge"
                                element={<EmptyChallengePage />}
                            />
                            <Route
                                path="challenge/:challengeId"
                                element={<ChallengePage />}
                            />
                            <Route
                                path="last-challenge/:challengeId"
                                element={<LastChallengePage />}
                            />
                        </Route>

                        <Route
                            path="/auth/oauth-response"
                            element={<OauthPage />}
                        ></Route>
                        <Route
                            path="/truth-room/:groupId/challenge/:challengeId"
                            element={<TruthRoom />}
                        />
                        <Route
                            path="/truth-room/enter-test/:challengeId"
                            element={<ConnectionTest />}
                        ></Route>
                    </Routes>
                </ChakraProvider>
            </Suspense>
        </>
    );
}

export default App;
