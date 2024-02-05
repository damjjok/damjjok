import { useRecoilState } from "recoil";
import {
    useDisclosure,
    Button,
    HStack,
    Text,
    VStack,
    Box,
} from "@chakra-ui/react";
import { evidenceList } from "contexts/Article";
import EvidenceItems from "./evidence-items/EvidenceItems";
import EvidenceCreateModal from "./evidence-modal/EvidenceCreateModal";
import { ViewIcon } from "@chakra-ui/icons";

const Evidence = () => {
    const [evidence, setEvidence] = useRecoilState(evidenceList);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleSaveEvidence = (newEvidence) => {
        setEvidence([...evidence, newEvidence]);
    };
    return (
        <div className="Evidence mt-3">
            <Text fontSize="xl" fontWeight="bold" mb={"1rem"}>
                증거
            </Text>

            <Box overflowX={"auto"} width={"75vw"}>
                <HStack spacing={4} align="stretch">
                    {evidence.map((item, index) => (
                        <EvidenceItems key={index} {...item} />
                    ))}
                    <Button
                        colorScheme="yellow"
                        backgroundColor="#ffd100"
                        _hover={{ bg: "#e6c000" }}
                        onClick={onOpen}
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        w="15vw" // 너비 설정
                        h="15vh" // 높이 설정
                    >
                        <VStack>
                            <ViewIcon boxSize={8} />
                            <Text>새 증거 추가하기</Text>
                        </VStack>
                    </Button>
                </HStack>
            </Box>

            <EvidenceCreateModal
                isOpen={isOpen}
                onClose={onClose}
                onSave={handleSaveEvidence}
            />
        </div>
    );
};

export default Evidence;
