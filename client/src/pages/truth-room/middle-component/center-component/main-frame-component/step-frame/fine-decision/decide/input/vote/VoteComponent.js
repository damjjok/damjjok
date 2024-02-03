import { Text } from "@chakra-ui/react";
import React from "react";
import ConfirmButtonComponent from "../../../ConfirmButtonComponent";
import { useRecoilValue } from "recoil";
import { inputFineListState } from "contexts/TruthRoom";
import FineItemComponent from "./FineItemComponent";

function VoteComponent(props) {
    const inputFineList = useRecoilValue(inputFineListState);

    return (
        <div style={{ textAlign: "center" }}>
            <div className="title-container">
                <Text as="b" fontSize={"35px"}>
                    벌금 결정
                </Text>
                <div style={{ marginTop: "30px" }}>
                    {inputFineList.map((fine) => (
                        <FineItemComponent fine={fine} />
                    ))}
                </div>
                <ConfirmButtonComponent margin={50} />
            </div>
        </div>
    );
}

export default VoteComponent;
