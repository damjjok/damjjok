import React from "react";
import { Wrapper } from "../InnerComponent.style";
import StreakComponent from "./StreakComponent";

function AttendanceComponent(props) {
    return (
        <Wrapper>
            담쪽이의 출석
            <StreakComponent />
        </Wrapper>
    );
}

export default AttendanceComponent;
