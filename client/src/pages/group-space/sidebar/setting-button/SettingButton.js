import { SettingsIcon } from "@chakra-ui/icons";
import { Box, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from "@chakra-ui/react";
import GroupMemberModal from "./group-member-modal/GroupMemberModal";
import GroupInviteModal from "./group-invite-modal/GroupInviteModal";

function SettingButton() {
  return <>
    <Menu>
      <MenuButton
        px={2}
        py={2}
        backgroundColor='dam.yellow'
        borderRadius='full'
        transition='all 0.2s'
        // _expanded={{ bg: 'blue.400' }}
      >
          <Box display='flex' alignItems='center' justifyContent='center' height='100%'>
            <SettingsIcon color='dam.black'/>
          </Box>
      </MenuButton>
      <MenuList>
        {/* 그룹멤버모달 */}
        <GroupMemberModal/>
        <MenuDivider />
        <GroupInviteModal/>
      </MenuList>
    </Menu>
  </>
}

export default SettingButton;