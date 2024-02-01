import { useRecoilState } from "recoil";
import { useDisclosure } from "@chakra-ui/react";
import { testimonyList } from "contexts/Article";
import TestimonyCreateModal from "./testimony-modal/TestimonyCreateModal";

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
            <button onClick={onOpen}> +</button>
            <TestimonyCreateModal
                isOpen={isOpen}
                onClose={onClose}
                onSave={handleSaveTestimony}
            />
        </div>
    );
};

export default Testimony;
