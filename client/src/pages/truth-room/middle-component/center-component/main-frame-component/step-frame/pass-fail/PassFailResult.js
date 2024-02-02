import React from "react";

function PassFailResult({ result }) {
    // result: PASS or FAIL
    return (
        <div>
            <h2>투표 결과</h2>
            <h1>{result}</h1>
        </div>
    );
}

export default PassFailResult;
