import BasicButton from "components/button/BasicButton";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { challengeIdState, isVotedState } from "contexts/TruthRoomSocket";
import React, { useContext } from "react";
import { WebSocketContext } from "contexts/WebSocketContext";

function DoVoteComponent(props) {
    const { passFailVote } = useContext(WebSocketContext);
    const challengeId = useRecoilValue(challengeIdState);
    const setIsVoted = useSetRecoilState(isVotedState);

    function handleClickVote(voteOption) {
        // voteOption : true or false
        console.log("어디에 투표했을까요?: " + voteOption);
        passFailVote(challengeId, voteOption);
        setIsVoted(true);
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <div style={{ margin: "10px" }}>
                담쪽이가 챌린지를 계속 할 수 있을까요?
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "10px",
                }}
            >
                <div style={{ margin: "5px" }}>
                    <BasicButton
                        buttonName={"예"}
                        variant={"smbtn"}
                        onClick={() => handleClickVote(true)}
                    ></BasicButton>
                </div>

                <div style={{ margin: "5px" }}>
                    <BasicButton
                        buttonName={"아니오"}
                        variant={"smbtn"}
                        onClick={() => handleClickVote(false)}
                    ></BasicButton>
                </div>
            </div>
        </div>
    );
}

export default DoVoteComponent;
