//App.js

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage.js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import GroupHome from "./pages/groupspace/group-home/GroupHome.js";
import { useRecoilValue } from "recoil";
import { currentGroupState } from "./context/user.js";

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
        <ChakraProvider theme={theme}>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <LandingPage
                                groupId={currentGroup.groupId}
                                groupName={currentGroup.groupName}
                            />
                        }
                    />
                    <Route
                        path={`/group/${currentGroup.groupId}/*`}
                        element={<GroupHome />}
                    />
                </Routes>
            </Router>
        </ChakraProvider>
    );
}

export default App;
