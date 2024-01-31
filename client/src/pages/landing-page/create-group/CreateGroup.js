import { useState } from "react";
import {

    Button,
    useDisclosure,
    HStack,
} from "@chakra-ui/react";
import CreateGroupModal from "./create-group- modal/CreateGroupModal";

const CreateGroup = () => {
    const [groupData, setGroupData] = useState([]);
    const [groupName, setGroupName] = useState(""); // 그룹 이름 상태 추가
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onGroupCreate = () => {
        const newGroupData = {
            groupName,
        };
        setGroupData([...groupData, newGroupData]); // 그룹 데이터 배열에 추가
        setGroupName(" "); // 입력 필드 초기화
        onClose();
    };

  

    return (
        <div className="CreateGroup">
            <img src="/logo.png" alt="logoImg" />
            {groupData.length < 1 ? (
                <>
                    <p>
                        소속된 그룹이 없습니다! <br />
                        그룹을 생성하고 멤버를 초대해 주세요!
                    </p>

                    <div>
                        {/* <button onClick={onOpen}>+</button> */}

                        <Button
                            onClick={onOpen}
                            size="xl" // 버튼 크기
                            fontSize="4xl" // 글자 크기
                            colorScheme="blue" // 버튼 색상 스킴
                            px={10} // 좌우 패딩
                            py={7} // 상하 패딩
                            bg="#ffd100"
                            width="120px"
                            height="120px"
                        >
                            +
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <p>그룹 선택하기</p>
                    <div>
                        <HStack spacing={4}>
                            {groupData.map((group, index) => (
                                // <p key={index}>{group.groupName}</p>

                                <Button
                                    // onClick={onOpen}
                                    key={index}
                                    size="xl" // 버튼 크기
                                    fontSize="30px" // 글자 크기
                                    colorScheme="blue" // 버튼 색상 스킴
                                    px={10} // 좌우 패딩
                                    py={7} // 상하 패딩
                                    bg="#ffd100"
                                    width="120px"
                                    height="120px"
                                >
                                    {group.groupName}
                                </Button>
                            ))}

                            <Button
                                onClick={onOpen}
                                size="xl" // 버튼 크기
                                fontSize="4xl" // 글자 크기
                                colorScheme="blue" // 버튼 색상 스킴
                                px={10} // 좌우 패딩
                                py={7} // 상하 패딩
                                bg="#ffd100"
                                width="120px"
                                height="120px"
                            >
                                +
                            </Button>
                        </HStack>
                    </div>
                </>
            )}

            <CreateGroupModal
              isOpen={isOpen}
              onClose={onClose}
              groupName={groupName}
              setGroupName={setGroupName}
              onGroupCreate={onGroupCreate}
            />
        </div>
    );
};

export default CreateGroup;
