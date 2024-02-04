import { useRecoilState } from "recoil";
import { useDisclosure, Button, HStack, Text } from "@chakra-ui/react";
import { evidenceList } from "contexts/Article";
import EvidenceItems from "./evidence-items/EvidenceItems";
import EvidenceCreateModal from "./evidence-modal/EvidenceCreateModal";

const Evidence = () => {
    const [evidence, setEvidence] = useRecoilState(evidenceList);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleSaveEvidence = (newEvidence) => {
        setEvidence([...evidence, newEvidence]);
    };
    return (
        <div className="Evidence">
            <Text fontSize="3xl" fontWeight="bold">
                증거
            </Text>
            {evidence.length < 1 ? (
                <>
                    <Button
                        colorScheme="yellow"
                        backgroundColor="#ffd100"
                        _hover={{ bg: "#e6c000" }}
                        onClick={onOpen}
                    >
                        +
                    </Button>
                </>
            ) : (
                <>
                    <div>
                        <HStack spacing={4} align="stretch">
                            {evidence.map((item, index) => (
                                <EvidenceItems key={index} {...item} />
                            ))}
                            <Button
                                colorScheme="yellow"
                                backgroundColor="#ffd100"
                                _hover={{ bg: "#e6c000" }}
                                onClick={onOpen}
                            >
                                +
                            </Button>
                        </HStack>
                    </div>
                </>
            )}

            <EvidenceCreateModal
                isOpen={isOpen}
                onClose={onClose}
                onSave={handleSaveEvidence}
            />
        </div>
    );
};

export default Evidence;
