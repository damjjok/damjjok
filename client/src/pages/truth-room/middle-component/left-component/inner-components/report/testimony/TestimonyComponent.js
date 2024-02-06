import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
    showingTestimonyState,
    testimonyIndexState,
    testimonyState,
} from "contexts/TruthRoom";
import TestimonyFrame from "./TestimonyFrame";
import { Wrapper } from "../TabComponent.style";
import { getTestimoniesInTruthRoom } from "apis/api/TruthRoom";

function TestimonyComponent(props) {
    // const testimonies = useRecoilValue(testimonyState);
    const [testimonies, setTestimonies] = useState([]);
    // const setTestimonyIdx = useSetRecoilState(testimonyIndexState);
    const setShowingTestimony = useSetRecoilState(showingTestimonyState);

    function handlerTestimonyClick(testimony) {
        setShowingTestimony(testimony);
    }

    useEffect(() => {
        getTestimoniesInTruthRoom(1, setTestimonies);
    }, []);

    return (
        <Wrapper>
            {testimonies.map((testimony, index) => (
                <TestimonyFrame
                    key={index}
                    testimony={testimony}
                    onClick={() => handlerTestimonyClick(testimony)}
                />
            ))}
        </Wrapper>
    );
}

export default TestimonyComponent;
