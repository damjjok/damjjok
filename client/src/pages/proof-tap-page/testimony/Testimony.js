import { useDisclosure, Button, HStack, Text, VStack, Box, useBreakpointValue } from "@chakra-ui/react";
import TestimonyCreateModal from "../modal/TestimonyCreateModal";
import TestimonyItems from "./TestimonyItems";
import { EditIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTestimonies, postTestimony } from "apis/api/Proof";

const Testimony = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const [testimonies, setTestimonies] = useState([]);
    const { challengeId } = useParams();

    const saveTestimony = async (testimony) => {
        await postTestimony(testimony, challengeId);
        await getTestimonies(challengeId, setTestimonies);
    };

    useEffect(() => {
        getTestimonies(challengeId, setTestimonies);
    }, [challengeId]);

    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <div className="Testimony mb-5 ">
            <Text fontSize="xl" fontWeight="bold" mb={"1rem"}>
                증언
            </Text>
            <Box overflowX={"auto"}>
                <HStack spacing={4} align="stretch">
                    {testimonies.map((item, index) => (
                        <TestimonyItems key={item.testimonyId} {...item} />
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
                                <EditIcon boxSize={8} />

                                <Text>새 증언 추가하기</Text>
                            </VStack>
                        </Button>
                    </Box>
                </HStack>
            </Box>

            <TestimonyCreateModal isOpen={isOpen} onClose={onClose} onSave={saveTestimony} />
        </div>
    );
};

export default Testimony;
