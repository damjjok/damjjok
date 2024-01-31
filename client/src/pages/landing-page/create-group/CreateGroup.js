import { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Image,
    VStack,
    HStack,
    Text,
    FormControl,
    Input,
} from "@chakra-ui/react";
import logo from "assets/images/logo.png";

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

    const handleGroupNameChange = (e) => {
        setGroupName(e.target.value); // 입력된 그룹 이름 설정
    };

    return (
        <div className="CreateGroup">
            <img src={logo} alt="logoImg" />
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

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent width="md" p={5} mx="auto" my="auto">
                    <ModalHeader> </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            mx="auto"
                            my={4}
                            boxSize="70%"
                        />
                        <VStack spacing={4}>
                            <Text mb={3}>그룹 생성하기</Text>

                            <FormControl>
                                <Input
                                    mb={3}
                                    placeholder="그룹이름"
                                    value={groupName}
                                    onChange={handleGroupNameChange}
                                />
                            </FormControl>

                            <Button
                                colorScheme="yellow"
                                size="md"
                                w="full"
                                onClick={onGroupCreate}
                            >
                                그룹 만들기
                            </Button>

                            {/* 다른 소셜 로그인 버튼들 추가 */}
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default CreateGroup;
