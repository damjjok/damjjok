import React, { useState } from "react";
import { Wrapper } from "./TestimonyFrame.style";
import { useRecoilValue } from "recoil";
import { testimonyState } from "contexts/TruthRoom";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import TestimonyDeatilComponent from "./detail/TestimonyDeatilComponent";

function TestimonyFrame(props) {
    // 이전, 다음 버튼과 중앙에는 증거 상세 내용 보는 컴포넌트
    const testimonies = useRecoilValue(testimonyState);
    const [testimonyIdx, setTestimonyIdx] = useState(0); // 보여 줄 증거의 인덱스

    function handleLeftClick() {
        setTestimonyIdx(testimonyIdx - 1);
    }

    function handleRightClick() {
        setTestimonyIdx(testimonyIdx + 1);
    }

    return (
        <Wrapper>
            <button
                onClick={handleLeftClick}
                disabled={testimonyIdx === 0}
                style={{ color: testimonyIdx === 0 ? "grey" : "inherit" }}
            >
                <ChevronLeftIcon boxSize={"100px"} />
            </button>
            <TestimonyDeatilComponent testimony={testimonies[testimonyIdx]} />
            <button
                onClick={handleRightClick}
                disabled={testimonyIdx === testimonies.length - 1}
                style={{
                    color:
                        testimonyIdx === testimonies.length - 1
                            ? "grey"
                            : "inherit",
                }}
            >
                <ChevronRightIcon boxSize={"100px"} />
            </button>
        </Wrapper>
    );
}

export default TestimonyFrame;
