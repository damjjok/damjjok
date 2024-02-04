import { useRecoilState } from "recoil";
import { useDisclosure, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { testimonyList } from "contexts/Article";
import TestimonyCreateModal from "./testimony-modal/TestimonyCreateModal";
import TestimonyItems from "./testimony-items/TestimonyItems";
import { EditIcon } from "@chakra-ui/icons";

const Testimony = () => {
    const [testimony, setTestimony] = useRecoilState(testimonyList);

    const handleSaveTestimony = (newTestimony) => {
        setTestimony([...testimony, newTestimony]);
        console.log(testimony);
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <div className="Testimony">
            <Text fontSize="3xl" fontWeight="bold" mb={5}>
                증언
            </Text>
            {testimony.length < 1 ? (
                <>
                    <Button
                        colorScheme="yellow"
                        backgroundColor="#ffd100"
                        _hover={{ bg: "#e6c000" }}
                        minH="200px"
                        minW="200px"
                        onClick={onOpen}
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <VStack>
                            <EditIcon boxSize={8} />
                            <Text>새 증언 추가하기</Text>
                        </VStack>
                    </Button>
                </>
            ) : (
                <>
                    <div>
                        <HStack spacing={4} align="stretch">
                            {testimony.map((item, index) => (
                                <TestimonyItems key={index} {...item} />
                            ))}
                            <Button
                                colorScheme="yellow"
                                backgroundColor="#ffd100"
                                _hover={{ bg: "#e6c000" }}
                                onClick={onOpen}
                                minH="200px"
                                minW="200px"
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <VStack>
                                    <EditIcon boxSize={8} />

                                    <Text>새 증언 추가하기</Text>
                                </VStack>
                            </Button>
                        </HStack>
                    </div>
                </>
            )}

            <TestimonyCreateModal
                isOpen={isOpen}
                onClose={onClose}
                onSave={handleSaveTestimony}
            />
        </div>
    );
};

export default Testimony;
