import React from "react";
import { Wrapper } from "./TruthRoom.style";
import TopComponent from "./top-component/TopComponent";
import MiddleComponent from "./middle-component/MiddleComponent";
import BottomComponent from "./bottom-component/BottomComponent";
import { Route, Routes } from "react-router-dom";
import ConnectionTest from "./openvidu/ConnectionTest";

function TruthRoom() {
    return (
        <Routes>
            <Route
                path=""
                element={
                    <Wrapper>
                        <TopComponent></TopComponent>
                        <MiddleComponent></MiddleComponent>
                        <BottomComponent></BottomComponent>
                    </Wrapper>
                }
            ></Route>
            <Route
                path="test"
                element={<ConnectionTest></ConnectionTest>}
            ></Route>
        </Routes>
    );
}

export default TruthRoom;
