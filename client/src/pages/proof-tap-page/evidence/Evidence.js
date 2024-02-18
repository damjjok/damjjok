import { useRecoilState } from "recoil";
import { useDisclosure, Button, HStack, Text, VStack, Box } from "@chakra-ui/react";
import { evidenceList } from "contexts/Article";
import EvidenceItems from "./EvidenceItems";
import EvidenceCreateModal from "../modal/EvidenceCreateModal";
import { ViewIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEvidences, postEvidence } from "apis/api/Proof";

const Evidence = () => {
    const [evidences, setEvidences] = useState([]);
    const { challengeId } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleSaveEvidence = async (newEvidence) => {
        await postEvidence({ ...newEvidence, challengeId });
        await getEvidences(challengeId, setEvidences);
    };

    useEffect(() => {
        getEvidences(challengeId, setEvidences);
    }, [challengeId]);

    return (
        <div className="Evidence mt-3">
            <Text fontSize="xl" fontWeight="bold" mb={"1rem"}>
                증거
            </Text>

            <Box overflowX={"auto"}>
                <HStack spacing={4} align="stretch">
                    {evidences.map((item, index) => (
                        <EvidenceItems key={item.evidenceId} {...item} />
                    ))}
                    <Box>
                        <Button
                            colorScheme="yellow"
                            backgroundColor="#ffd100"
                            _hover={{ bg: "#e6c000" }}
                            onClick={onOpen}
                            width={"15rem"}
                            height={"15vh"}
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <VStack width={"15vw"}>
                                <ViewIcon boxSize={8} />
                                <Text>새 증거 추가하기</Text>
                            </VStack>
                        </Button>
                    </Box>
                </HStack>
            </Box>

            <EvidenceCreateModal isOpen={isOpen} onClose={onClose} onSave={handleSaveEvidence} />
        </div>
    );
};

export default Evidence;
