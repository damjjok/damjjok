import React from "react";
import { Wrapper } from "./TruthRoom.style";
import TopComponent from "./top-component/TopComponent";
import BottomComponent from "./bottom-component/BottomComponent";

function TruthRoom() {
    return (
        <Wrapper>
            <TopComponent></TopComponent>
            <BottomComponent></BottomComponent>
        </Wrapper>
    );
}

export default TruthRoom;
