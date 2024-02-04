import React from "react";
import SmallFrameComponent from "../../../../../small-frame/SmallFrameComponent";
import VoteComponent from "./VoteComponent";
import { Wrapper } from "../FineComponent.style";

function FineVoteComponent(props) {
    return (
        <Wrapper>
            <SmallFrameComponent
                width={700}
                height={340}
                content={<VoteComponent />}
            />
        </Wrapper>
    );
}

export default FineVoteComponent;
