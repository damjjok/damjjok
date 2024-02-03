import React from "react";
import SmallFrameComponent from "../../../small-frame/SmallFrameComponent";
import CheckImageComponent from "./CheckImageComponent";
import { Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { decidedFineState } from "contexts/TruthRoom";
import ConfirmButtonComponent from "../ConfirmButtonComponent";

function ResultComponent(props) {
    const decidedFine = useRecoilValue(decidedFineState);

    return (
        <div>
            <SmallFrameComponent
                width={700}
                height={340}
                content={
                    <div>
                        <CheckImageComponent />
                        <div style={{ textAlign: "center" }}>
                            <div style={{ marginTop: "10px" }}>
                                <Text as="b" fontSize={"30px"}>
                                    벌금 결정 완료!
                                </Text>
                                <div style={{ marginTop: "20px" }}>
                                    <Text as="b" fontSize={"20px"}>
                                        벌금은 <p></p>
                                        {decidedFine}원이예요
                                    </Text>
                                </div>
                            </div>
                        </div>
                        <ConfirmButtonComponent />
                    </div>
                }
            ></SmallFrameComponent>
        </div>
    );
}

export default ResultComponent;
