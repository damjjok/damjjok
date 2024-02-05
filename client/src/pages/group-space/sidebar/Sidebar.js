import GroupList from "./group-list/GroupList";
import ChallengeList from "./challenge-list/ChallengeList";
import SettingButton from "./setting-button/SettingButton";
import { Box, Flex } from "@chakra-ui/react";

function Sidebar() {
    return (
        <Box borderRight={"1px solid rgba(214,214,214,0.25)"} height={"90vh"} width={"20vw"}>
            <div className="flex flex-col h-300px px-4">
                <Flex justifyContent="space-between" alignItems="center" className="my-8">
                    <GroupList />
                    <SettingButton />
                </Flex>
                <div className="my-8">
                    <ChallengeList />
                </div>
            </div>
        </Box>
    );
}

export default Sidebar;
