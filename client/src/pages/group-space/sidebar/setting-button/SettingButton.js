import { SettingsIcon } from "@chakra-ui/icons";
import { Box, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from "@chakra-ui/react";

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
        <MenuItem>그룹원 보기</MenuItem>
        <MenuDivider />
        <MenuItem>그룹 초대하기</MenuItem>
      </MenuList>
    </Menu>
  </>
}

export default SettingButton;