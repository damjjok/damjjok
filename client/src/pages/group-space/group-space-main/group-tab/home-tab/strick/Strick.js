import { useRecoilValue } from "recoil";
import { challengeState } from "../../../../../../contexts/Challenge";
import React from "react";

// 테스트용 챌린지 객체
const currentChallenge = {
    challengeId: 0,
    createdAt: "2024-01-31T01:43:20.139Z",
    determination: "오늘 하루도,,, 홧팅 ^^@@",
    duration: 180,
    groupId: 0,
    initialMoney: 40000,
    profilePath: "",
    savedMoney: 3000,
    savedPeriod: 15,
    status: "",
    attendance: [
        { attendanceId: "0", attendanceDate: "2024-01-31T01:43:20.139Z" },
        { attendanceId: "1", attendanceDate: "2024-02-01T01:43:20.139Z" },
    ],
};

function Strick({ startedDate }) {
    const attendanceData = Array(currentChallenge.duration)
        .fill(false)
        .map((_, i) => i <= currentChallenge.attendance.length - 1);
    // 일단 누적 출석 값으로 구현
    // API 연결 후, 구체적으로 로직 수정 필요합니다.

    return (
        // css 150~80일인 경우 오른쪽으로 쏠림
        <div className="flex flex-col over">
            <div className="mt-4 max-w-2xl grid grid-flow-col grid-rows-5 grid-cols-32 gap-1">
                {attendanceData.map((attended, i) => (
                    <div
                        key={i}
                        className={`w-3 h-3 rounded ${
                            attended ? "bg-damyellow" : "bg-damlightgray"
                        }`}
                    />
                ))}
            </div>
            <p className="text-xs text-right">
                금연 시작일 : {startedDate.toLocaleDateString()} | 목표일 수 :{" "}
                {currentChallenge.duration}일
            </p>
        </div>
    );
}

export default Strick;
