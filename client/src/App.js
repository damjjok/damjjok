//App.js

import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
// import GroupHome from "./pages/groupspace/group-home/GroupHome.js";
import { useRecoilValue } from "recoil";
import { Suspense } from "react";
import Landing from "./pages/landing-page/Landig.js";
import CreateGroup from "./pages/landing-page/create-group/CreateGroup.js";
import GroupSpaceHome from "./pages/group-space/GroupSpaceHome.js";
import TruthRoom from "pages/truth-room/TruthRoom";
import HomeTab from "pages/group-space/group-space-main/group-tab/home-tab/HomeTab";
import ArticleTab from "pages/group-space/group-space-main/group-tab/article-tab/ArticleTab";
import GroupTab from "pages/group-space/group-space-main/group-tab/GroupTab";
import CreateChallenge from "pages/group-space/group-space-main/empty-challenge/create-challenge/CreateChallenge";
import EmptyChallenge from "pages/group-space/group-space-main/empty-challenge/EmptyChallenge";
import LastChallenge from "pages/group-space/group-space-main/last-challenge/LastChallenge";
import { createGlobalStyle } from "styled-components";
import OauthPage from "pages/landing-page/oauth-page/OauthPage";

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
    return (
        <>
            <GlobalStyle />
            <Suspense>
                <ChakraProvider theme={theme}>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/create-group" element={<CreateGroup />} />
                        <Route
                            path={`/group/:groupId/*`}
                            element={<GroupSpaceHome />}
                        >
                            <Route
                                path="create-challenge"
                                element={<CreateChallenge />}
                            />
                            <Route
                                path="empty-challenge"
                                element={<EmptyChallenge />}
                            />
                            <Route
                                path="challenge/:challengeId"
                                element={<GroupTab />}
                            />
                            <Route
                                path="last-challenge/:challengeId"
                                element={<LastChallenge />}
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
                    </Routes>
                </ChakraProvider>
            </Suspense>
        </>
    );
}

export default App;
