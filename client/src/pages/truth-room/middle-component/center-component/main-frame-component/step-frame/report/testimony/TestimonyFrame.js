import React, { useState } from "react";
import { Wrapper } from "./TestimonyFrame.style";
import { useRecoilValue } from "recoil";
import { testimonyState } from "contexts/TruthRoom";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

function TestimonyFrame(props) {
    // 이전, 다음 버튼과 중앙에는 증거 상세 내용 보는 컴포넌트
    const testimonies = useRecoilValue(testimonyState);
    const [testimonyIdx, setTestimonyIdx] = useState(0); // 보여 줄 증거의 인덱스

    return (
        <Wrapper>
            <ChevronLeftIcon boxSize={"100px"} />
            <ChevronRightIcon boxSize={"100px"} />
        </Wrapper>
    );
}

export default TestimonyFrame;
