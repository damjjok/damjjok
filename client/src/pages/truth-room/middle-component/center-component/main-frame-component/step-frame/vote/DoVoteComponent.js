import BasicButton from "components/button/BasicButton";
import { useSetRecoilState } from "recoil";
import { isVotedState } from "contexts/TruthRoomSocket";
import React from "react";

function DoVoteComponent(props) {
    const setIsVoted = useSetRecoilState(isVotedState);

    function handleClickVote(voteOption) {
        // voteOption : 1(yes) or no(0), 나중에 소켓으로 데이터 쏠 때 필요
        console.log("어디에 투표했을까요?: " + voteOption);
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
                        onClick={() => handleClickVote(1)}
                    ></BasicButton>
                </div>

                <div style={{ margin: "5px" }}>
                    <BasicButton
                        buttonName={"아니오"}
                        variant={"smbtn"}
                        onClick={() => handleClickVote(0)}
                    ></BasicButton>
                </div>
            </div>
        </div>
    );
}

export default DoVoteComponent;
