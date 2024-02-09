import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
    showingTestimonyState,
    testimonyIndexState,
    testimonyState,
} from "contexts/TruthRoom";
import TestimonyFrame from "./TestimonyFrame";
import { Wrapper } from "../TabComponent.style";
import { useParams } from "react-router-dom";
import { getTestimoniesInTruthRoom } from "apis/api/Proof";

function TestimonyComponent(props) {
    // const testimonies = useRecoilValue(testimonyState);
    const { challengeId } = useParams();
    const [testimonies, setTestimonies] = useState([]);
    // const setTestimonyIdx = useSetRecoilState(testimonyIndexState);
    const setShowingTestimony = useSetRecoilState(showingTestimonyState);

    function handlerTestimonyClick(testimony) {
        setShowingTestimony(testimony);
    }

    useEffect(() => {
        getTestimoniesInTruthRoom(challengeId, setTestimonies);
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
