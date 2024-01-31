import React from "react";
import { useRecoilValue } from "recoil";
import { testimonyState } from "contexts/TruthRoom";
import TestimonyFrame from "./TestimonyFrame";
import { Wrapper } from "../TabComponent.style";

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
