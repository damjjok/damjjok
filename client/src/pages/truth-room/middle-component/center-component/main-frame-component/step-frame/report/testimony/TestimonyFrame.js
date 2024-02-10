import { Wrapper } from "./TestimonyFrame.style";
import { useRecoilState, useRecoilValue } from "recoil";
import { showingTestimonyState } from "contexts/TruthRoom";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import TestimonyDeatilComponent from "./detail/TestimonyDeatilComponent";

function TestimonyFrame(props) {
    // 이전, 다음 버튼과 중앙에는 증거 상세 내용 보는 컴포넌트
    // const testimonies = useRecoilValue(testimonyState);
    // const [testimonyIdx, setTestimonyIdx] = useRecoilState(testimonyIndexState); // 보여 줄 증거의 인덱스
    const showingTestimony = useRecoilValue(showingTestimonyState);

    return (
        <Wrapper>
            <TestimonyDeatilComponent testimony={showingTestimony} />
        </Wrapper>
    );
}

export default TestimonyFrame;
