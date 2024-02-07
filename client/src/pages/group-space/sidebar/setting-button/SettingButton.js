import { SettingsIcon } from "@chakra-ui/icons";
import {
    Box,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import GroupMemberModal from "./group-member-modal/GroupMemberModal";
import GroupInviteModal from "./group-invite-modal/GroupInviteModal";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentGroupMemberState } from "contexts/Group";
import { useEffect } from "react";
import { getGroupMember } from "apis/api/Group";

function SettingButton() {
    const { groupId } = useParams();

    const [currentGroupMember, setCurrentGroupMember] = useRecoilState(
        currentGroupMemberState,
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getGroupMember(groupId);
                const updatedGroupMember = response.list;
                setCurrentGroupMember(updatedGroupMember); // Recoil 상태에 데이터 적용
                console.log(updatedGroupMember);
            } catch (error) {
                console.error("챌린지 정보 불러오기 실패", error);
            }
        };

        fetchData(); // fetchData 함수 호출
    }, [groupId]);
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
