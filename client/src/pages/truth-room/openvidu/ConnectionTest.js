// 오픈비두 연결에 쓰일 테스트 컴포넌트
import { Button } from "@chakra-ui/react";
import {
    closeOpenviduSession,
    getOpenviduToken,
    getSessionId,
} from "apis/api/TruthRoom";
import React, { useState } from "react";

function ConnectionTest(props) {
    const [sessionId, setSessionId] = useState("d");
    const [openviduToken, setOpenviduToken] = useState("d");

    async function getSessionIdAndSave() {
        const gotSessionId = await getSessionId(5);
        setSessionId(gotSessionId);
    }

    async function getOpenviduTokenAndSave() {
        const gotOpenviduToken = await getOpenviduToken(sessionId);
        setOpenviduToken(gotOpenviduToken);
    }

    return (
        <div>
            <Button onClick={() => getSessionIdAndSave()}>
                세션 id 받아오기
            </Button>
            <Button onClick={() => getOpenviduTokenAndSave()}>
                토큰 받아오기
            </Button>
            <Button onClick={() => closeOpenviduSession(5)}>
                세션 삭제하기
            </Button>
        </div>
    );
}

export default ConnectionTest;
