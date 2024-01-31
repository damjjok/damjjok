import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Wrapper } from "./InnerComponent.style";
import { groupState } from "contexts/TruthRoom";

function JoinMemberComponent() {
    const joinMember = useRecoilValue(groupState);
    const [damJJok, setDamJJok] = useState({});
    const [phDs, setPhDs] = useState([]);
    useEffect(() => {
        let tempDamJJok = {};
        let tempPhDs = [];
        for (var i = 0; i < joinMember.length; i++) {
            // 담쪽이와 박사님들 구분
            if (joinMember[i].role === "damJJok") tempDamJJok = joinMember[i];
            else if (joinMember[i].role === "phD") tempPhDs.push(joinMember[i]);
        }
        console.log(tempDamJJok);
        setDamJJok(tempDamJJok);
        setPhDs(tempPhDs);
    }, [joinMember]);

    return (
        // 지금은 임시 코드입니다.
        <Wrapper>
            <div style={{ margin: "20px" }}>참여 인원</div>
            <div style={{ margin: "20px" }}>
                담쪽이<div>{damJJok.name}</div>
            </div>
            <div style={{ margin: "20px" }}>
                박사님
                {phDs.map((phD) => (
                    <div>{phD.name}</div>
                ))}
            </div>
        </Wrapper>
    );
}

export default JoinMemberComponent;
