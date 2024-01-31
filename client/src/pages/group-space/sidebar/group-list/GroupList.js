import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import { currentGroupState } from "../../../../contexts/User";

function GroupList() {
    const currentGroup = useRecoilValue(currentGroupState);
    return (
        <Menu>
            <MenuButton
                as={Button}
                colorScheme="yellow"
                rightIcon={<ChevronDownIcon />}
            >
                {currentGroup.groupName}
            </MenuButton>
            <MenuList>
                <MenuItem minH="48px">
                    <span>그룹1</span>
                </MenuItem>
                <MenuItem minH="40px">
                    <span>그룹2</span>
                </MenuItem>
            </MenuList>
        </Menu>
    );
}

export default GroupList;
