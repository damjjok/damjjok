import { SettingsIcon } from "@chakra-ui/icons";
import { Box, Menu, MenuButton, MenuDivider, MenuList } from "@chakra-ui/react";
import GroupMemberModal from "./group-member-modal/GroupMemberModal";
import GroupInviteModal from "./group-invite-modal/GroupInviteModal";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGroupInfo, getGroupMember } from "apis/api/Group";

function SettingButton() {
    const { groupId } = useParams();
    const [currentGroupInfo, setCurrentGroupInfo] = useState({});
    const [currentGroupMember, setCurrentGroupMember] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const groupresponse = await getGroupInfo(groupId);
                const response = await getGroupMember(groupId);
                // console.log(groupresponse);
                const updatedGroupInfo = groupresponse.groupDto;
                setCurrentGroupInfo(updatedGroupInfo);
                const updatedGroupMember = response.list;
                setCurrentGroupMember(updatedGroupMember); // Recoil 상태에 데이터 적용
                // console.log(updatedGroupMember);
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
                    <GroupMemberModal currentGroupMember={currentGroupMember} />
                    <MenuDivider />
                    <GroupInviteModal currentGroupInfo={currentGroupInfo} />
                </MenuList>
            </Menu>
        </>
    );
}

export default SettingButton;
