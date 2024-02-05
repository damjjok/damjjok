// 오픈비두 연결에 쓰일 테스트 컴포넌트
import { Button } from "@chakra-ui/react";
import { getSessionId } from "apis/api/TruthRoom";
import React from "react";

function ConnectionTest(props) {
    return (
        <div>
            <Button onClick={() => getSessionId(5)}>세션 id 받아오기</Button>
            <Button>토큰 받아오기</Button>
        </div>
    );
}

export default ConnectionTest;
