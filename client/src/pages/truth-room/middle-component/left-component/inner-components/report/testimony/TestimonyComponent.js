import React from "react";
import { Wrapper } from "./TestimonyComponent.style";
import { useRecoilValue } from "recoil";
import { testimonyState } from "contexts/TruthRoom";
import TestimonyFrame from "./TestimonyFrame";

function TestimonyComponent(props) {
    const testimonies = useRecoilValue(testimonyState);
    return (
        <Wrapper>
            {testimonies.map((testimony) => (
                <TestimonyFrame testimony={testimony} />
            ))}
        </Wrapper>
    );
}

export default TestimonyComponent;
