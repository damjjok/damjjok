import {
    Heading,
    MenuItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import SearchBar from "pages/landing-page/create-group/create-group-modal/searchbar/SearchBar";

// 초대 코드 생성 페이지 완료되면, 해당 코드 ModalBody 안에 붙여넣기
function GroupInviteModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <MenuItem onClick={onOpen}>멤버 초대하기</MenuItem>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <p className=" font-extrabold">멤버 초대하기</p>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody py={10} px={5}>
                        <Heading size="md" textAlign={"center"}>
                            친구를 찾아보세요!
                        </Heading>
                        <SearchBar />
                        <Heading size="md" textAlign={"center"}>
                            주변 친구를 초대하세요!
                        </Heading>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default GroupInviteModal;
