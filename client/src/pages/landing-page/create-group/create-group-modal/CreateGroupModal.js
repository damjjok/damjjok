// GroupCreateModal.js
import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    Image,
    VStack,
    FormControl,
    Input,
    Text,
} from "@chakra-ui/react";
import logo from "assets/images/logo.png";
import SearchBar from "./searchbar/SearchBar";

const CreateGroupModal = ({
    isOpen,
    onClose,
    groupName,
    setGroupName,
    onGroupCreate,
}) => {
    const handleGroupNameChange = (e) => {
        setGroupName(e.target.value); // 입력된 그룹 이름 설정
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent width="md" p={5} mx="auto" my="auto">
                <ModalHeader> </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Image
                        src={logo}
                        alt="Logo"
                        mx="auto"
                        my={4}
                        boxSize="70%"
                    />
                    <VStack spacing={4}>
                        <Text mt={10} fontSize="2xl" fontWeight="bold">
                            그룹 생성하기
                        </Text>

                        <FormControl>
                            <Input
                                variant="flushed"
                                mb={3}
                                placeholder="그룹이름"
                                value={groupName}
                                onChange={handleGroupNameChange}
                                _focus={{
                                    borderBottom: "2px solid #ffd110", // 포커스 시 선 색상 변경
                                    boxShadow: "none", // 기본 테마의 포커스 boxShadow 제거
                                }}
                            />

                            <SearchBar />
                        </FormControl>

                        <Button
                            colorScheme="yellow"
                            size="md"
                            w="full"
                            onClick={onGroupCreate}
                        >
                            그룹 만들기
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CreateGroupModal;
