import React from "react";
import { Wrapper } from "../InnerComponent.style";
import ReportTab from "./tab/ReportTab";

function ReportComopnent(props) {
    return (
        <Wrapper>
            <div>제보 목록</div>
            <ReportTab></ReportTab>
        </Wrapper>
    );
}

export default ReportComopnent;
