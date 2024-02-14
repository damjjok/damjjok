import { SettingsIcon } from "@chakra-ui/icons";
import { Box, Menu, MenuButton, MenuDivider, MenuList } from "@chakra-ui/react";
import GroupMemberModal from "../../modal/GroupMemberModal";
import GroupInviteModal from "../../modal/GroupInviteModal";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGroupInfo, getGroupMember } from "apis/api/Group";
import { currentGroupState } from "contexts/Group";
import { useRecoilValue } from "recoil";

function SettingButton() {
    // const [currentGroupInfo, setCurrentGroupInfo] = useState({});

    return (
        <>
            <Menu>
                <MenuButton
                    px={2}
                    py={2}
                    backgroundColor="dam.yellow"
                    borderRadius="full"
                    transition="all 0.2s"
                    // _expanded={{ bg: 'blue.400' }}
                    _hover={{ backgroundColor: "#3182CE" }}
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                    >
                        <SettingsIcon color="dam.black" />
                    </Box>
                </MenuButton>
                <MenuList>
                    {/* 그룹멤버모달 */}
                    <GroupMemberModal />
                    <MenuDivider />
                    <GroupInviteModal />
                </MenuList>
            </Menu>
        </>
    );
}

export default SettingButton;
