import { Menu, MenuButton, MenuList, MenuItem, Button, Select } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import { currentGroupState } from "../../../../contexts/User";
import { useState } from "react";

//테스트를 위한 더미 데이터
const groupItems = ['E105', 'E106', 'E107']


function GroupList() {
    const currentGroup = useRecoilValue(currentGroupState);
    // 더미데이터이므로 더미데이터[0]으로 초기값 설정, 이후 props나 recoilstate 기반으로 선택한 그룹명이 표시될 수 있도록 수정해야 함
    const [selectedGroup, setSelectedGroup] = useState(groupItems[0]);
    return (
        // <Menu>
        //     <MenuButton
        //         as={Button}
        //         colorScheme="yellow"
        //         rightIcon={<ChevronDownIcon />}
        //     >
        //         {selectedGroup || currentGroup.groupName}
        //     </MenuButton>
        //     <MenuList>
        //     {
        //     groupItems.map((item, index) => (
        //         <MenuItem minH="48px" key={index} onClick={() => setSelectedGroup(item)}>
        //             <span>{item}</span>
                    /* 해당 그룹으로 가도록 링크도 달아줘야 함 */
                /* </MenuItem>
            ))
        }
            </MenuList>
        </Menu> */



        <Select placeholder={selectedGroup || currentGroup.groupName} size='md' bg='dam.yellow'>
             {
             groupItems.map((item, index) => (
                    selectedGroup !== item &&
                    <option minH="48px" key={index} onClick={() => setSelectedGroup(item)} className=" hover:cursor-pointer">
                        <span>{item}</span>
                       {/* 해당 그룹으로 가도록 링크도 달아줘야 함 */}
                   </option>

                
            ))
        }
        </Select>


    );
}

export default GroupList;
