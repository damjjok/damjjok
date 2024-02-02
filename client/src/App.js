//App.js

import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
// import GroupHome from "./pages/groupspace/group-home/GroupHome.js";
import { useRecoilValue } from "recoil";
import { currentGroupState } from "./contexts/User.js";
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
});

function App() {
    const currentGroup = useRecoilValue(currentGroupState);
    return (
        <Suspense>
            <ChakraProvider theme={theme}>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/create-group" element={<CreateGroup />} />
                    <Route path={`/group/${currentGroup.groupId}/*`} element={<GroupSpaceHome />}>
                        <Route path="createChallenge" element={<CreateChallenge />} />
                        <Route path="empty-challenge" element={<EmptyChallenge />} />
                        <Route path="" element={<GroupTab />} />
                    </Route>
                    <Route path="/truth-room" element={<TruthRoom />} />
                </Routes>
            </ChakraProvider>
        </Suspense>
    );
}

export default App;
