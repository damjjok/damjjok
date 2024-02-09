import Topbar from "./topbar/Topbar.js";
import Sidebar from "./sidebar/Sidebar.js";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import GroupSpaceMain from "./group-space-main/GroupSpaceMain.js";

// 회원 정보 Get API
function GroupSpacePage() {
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <div>
            <Topbar />
            <div className="flex">
                <Box
                    position={isMobile ? "fixed" : "static"}
                    bottom={isMobile ? "10px" : "auto"}
                    left={isMobile ? "10px" : "auto"}
                    zIndex={"docked"}
                >
                    <Sidebar />
                </Box>
                <Box className="w-full px-8">
                    <GroupSpaceMain />
                </Box>
            </div>
        </div>
    );
}

export default GroupSpacePage;

// 이 페이지에서 보여줘야 할 컴포넌트 :
// 탑바, 사이드바, 그룹스페이스 컴포넌트
