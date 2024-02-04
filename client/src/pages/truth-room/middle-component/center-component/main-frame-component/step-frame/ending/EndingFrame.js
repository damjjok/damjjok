import React from "react";
import EndingDamJJokFrame from "./damJJok/EndingDamJJokFrame";
import SmallFrameComponent from "../../small-frame/SmallFrameComponent";

function EndingFrame(props) {
    const testUser = {
        name: "김영후",
        role: "damJJok",
    };

    if (testUser.role === "damJJok") {
        return (
            <SmallFrameComponent
                width={900}
                height={600}
                content={<EndingDamJJokFrame />}
            ></SmallFrameComponent>
        );
    } else {
    }
}

export default EndingFrame;
