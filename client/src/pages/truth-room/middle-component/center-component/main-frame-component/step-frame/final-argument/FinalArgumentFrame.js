import React from "react";
import { Wrapper } from "./FinalArgumentFrame.style";
import { finalArgumentDamJJokState } from "contexts/TruthRoom";
import { useRecoilValue } from "recoil";
import UserVideoComponent from "pages/truth-room/openvidu/UserVideoComponent";

function FinalArgumentFrame(props) {
    const finalArgumentDamJJok = useRecoilValue(finalArgumentDamJJokState);

    return (
        <Wrapper>
            <div className="damJJok-frame">
                <UserVideoComponent
                    streamManager={finalArgumentDamJJok}
                    styleProps={{ width: "1000px" }}
                />
            </div>
        </Wrapper>
    );
}

export default FinalArgumentFrame;
