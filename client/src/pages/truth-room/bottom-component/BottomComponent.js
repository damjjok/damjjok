import { stepState } from "contexts/TruthRoom";
import { useRecoilValue } from "recoil";
import { Wrapper } from "./BottomComponent.style";
import { Button } from "@chakra-ui/react/dist";

function BottomComponent() {
    const step = useRecoilValue(stepState);

    if (step === 1)
        return (
            <Wrapper>
                <Button colorScheme="yellow">다음으로</Button>
            </Wrapper>
        );
    else return <Wrapper></Wrapper>;
}

export default BottomComponent;
