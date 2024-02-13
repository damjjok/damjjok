import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { showingTestimonyState } from "contexts/TruthRoom";
import TestimonyFrame from "./TestimonyFrame";
import { Wrapper } from "../TabComponent.style";
import { useParams } from "react-router-dom";
import { getTestimoniesInTruthRoom } from "apis/api/Proof";

function TestimonyComponent(props) {
    const { challengeId } = useParams();
    const [testimonies, setTestimonies] = useState([]);
    const setShowingTestimony = useSetRecoilState(showingTestimonyState);

    function handlerTestimonyClick(testimony) {
        setShowingTestimony(testimony);
    }

    useEffect(() => {
        console.log("증언 요청 보냄");
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
