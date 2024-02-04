import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Wrapper } from "../InnerComponent.style";
import { groupState } from "contexts/TruthRoom";
import SectionComponent from "./section/SectionComponent";

function JoinMemberComponent() {
    const joinMember = useRecoilValue(groupState);
    const [damJJok, setDamJJok] = useState([]);
    const [phDs, setPhDs] = useState([]);
    useEffect(() => {
        let tempDamJJok = [];
        let tempPhDs = [];
        for (var i = 0; i < joinMember.length; i++) {
            // 담쪽이와 박사님들 구분
            if (joinMember[i].role === "damJJok") tempDamJJok.push(joinMember[i]);
            else if (joinMember[i].role === "phD") tempPhDs.push(joinMember[i]);
        }
        setDamJJok(tempDamJJok);
        setPhDs(tempPhDs);
    }, [joinMember]);

    return (
        // 지금은 임시 코드입니다.
        <Wrapper>
            <div style={{ margin: "20px" }}>참여 인원</div>
            <SectionComponent type={"담쪽이"} members={damJJok}></SectionComponent>
            <SectionComponent type={"박사님"} members={phDs}></SectionComponent>
        </Wrapper>
    );
}

export default JoinMemberComponent;
