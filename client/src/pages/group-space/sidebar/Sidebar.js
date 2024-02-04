import GroupList from "./group-list/GroupList";
import ChallengeList from "./challenge-list/ChallengeList";
import SettingButton from "./setting-button/SettingButton";
import { Flex } from "@chakra-ui/react";

function Sidebar() {
    return (
        <div className="flex flex-col min-w-60 max-w-60 h-300px px-4 mr-4 border-r border-r-damlightgray/25">
            <Flex justifyContent='space-between' className="my-8">
                <GroupList />
                <SettingButton/>
            </Flex>
            <div className="my-8">
                <ChallengeList />
            </div>
        </div>
    );
}

export default Sidebar;
