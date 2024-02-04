import { Menu, MenuButton, MenuDivider, MenuItem, MenuList } from "@chakra-ui/react";

function SettingButton() {
  return <Menu>
  <MenuButton
    px={4}
    py={2}
    transition='all 0.2s'
    borderRadius='md'
    borderWidth='1px'
    _hover={{ bg: 'gray.400' }}
    _expanded={{ bg: 'blue.400' }}
    _focus={{ boxShadow: 'outline' }}
  >
  </MenuButton>
  <MenuList>
    <MenuItem>그룹원 보기</MenuItem>
    <MenuDivider />
    <MenuItem>그룹 초대하기</MenuItem>
  </MenuList>
</Menu>
}

export default SettingButton;