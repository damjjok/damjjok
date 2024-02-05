import { useRecoilState } from "recoil";
import {
    useDisclosure,
    Button,
    HStack,
    Text,
    VStack,
    Box,
} from "@chakra-ui/react";
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
        <div className="Testimony mb-5 ">
            <Text fontSize="xl" fontWeight="bold" mb={"1rem"}>
                증언
            </Text>
            <Box overflowX={"auto"} width={"75vw"}>
                <HStack spacing={4} align="stretch">
                    {testimony.map((item, index) => (
                        <TestimonyItems key={index} {...item} />
                    ))}
                    <Box>
                        <Button
                            colorScheme="yellow"
                            backgroundColor="#ffd100"
                            _hover={{ bg: "#e6c000" }}
                            onClick={onOpen}
                            width={"15vw"}
                            height={"15vh"}
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <VStack width={"15vw"}>
                                <EditIcon boxSize={8} />

                                <Text>새 증언 추가하기</Text>
                            </VStack>
                        </Button>
                    </Box>
                </HStack>
            </Box>

            <TestimonyCreateModal
                isOpen={isOpen}
                onClose={onClose}
                onSave={handleSaveTestimony}
            />
        </div>
    );
};

export default Testimony;
