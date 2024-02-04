import React from "react";
import EndingDamJJokFrame from "./damJJok/EndingDamJJokFrame";
import SmallFrameComponent from "../../small-frame/SmallFrameComponent";
import EndingPhDFrame from "./phD/EndingPhDFrame";

function EndingFrame(props) {
    const testUser = {
        name: "김영후",
        role: "phD",
    };

    if (testUser.role === "damJJok") {
        return (
            <SmallFrameComponent
                width={900}
                height={600}
                content={<EndingDamJJokFrame damJJok={testUser} />}
            ></SmallFrameComponent>
        );
    } else {
        return (
            <SmallFrameComponent
                width={900}
                height={600}
                content={<EndingPhDFrame damJJok={testUser} />}
            ></SmallFrameComponent>
        );
    }
}

export default EndingFrame;
