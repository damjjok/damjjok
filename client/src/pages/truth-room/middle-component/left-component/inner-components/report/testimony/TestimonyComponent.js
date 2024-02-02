import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { testimonyIndexState, testimonyState } from "contexts/TruthRoom";
import TestimonyFrame from "./TestimonyFrame";
import { Wrapper } from "../TabComponent.style";

function TestimonyComponent(props) {
    const testimonies = useRecoilValue(testimonyState);
    const setTestimonyIdx = useSetRecoilState(testimonyIndexState);

    function handlerTestimonyClick(index) {
        setTestimonyIdx(index);
    }

    return (
        <Wrapper>
            {testimonies.map((testimony, index) => (
                <TestimonyFrame
                    key={index}
                    testimony={testimony}
                    onClick={() => handlerTestimonyClick(index)}
                />
            ))}
        </Wrapper>
    );
}

export default TestimonyComponent;
