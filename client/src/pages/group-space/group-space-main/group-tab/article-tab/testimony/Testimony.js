import { useRecoilState } from "recoil";
import { useDisclosure, Button, HStack } from "@chakra-ui/react";
import { testimonyList } from "contexts/Article";
import TestimonyCreateModal from "./testimony-modal/TestimonyCreateModal";
import TestimonyItems from "./testimony-items/TestimonyItems";

const Testimony = () => {
    const [testimony, setTestimony] = useRecoilState(testimonyList);

    const handleSaveTestimony = (newTestimony) => {
        setTestimony([...testimony, newTestimony]);
        console.log(testimony);
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <div className="Testimony">
            <h2>증언</h2>

            {testimony.length < 1 ? (
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
                            {testimony.map((item, index) => (
                                <TestimonyItems key={index} {...item} />
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

            <TestimonyCreateModal
                isOpen={isOpen}
                onClose={onClose}
                onSave={handleSaveTestimony}
            />
        </div>
    );
};

export default Testimony;
