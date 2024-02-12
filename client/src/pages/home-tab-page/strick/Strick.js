import { useRecoilState, useRecoilValue } from "recoil";
import { challengeState } from "../../../contexts/Challenge";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { getAttendanceList } from "apis/api/Attendance";
import { attendanceListState } from "contexts/Attendance";

function Strick({ challenge, startedDate }) {
    const { challengeId } = useParams();
    // const [attendanceList, setAttendanceList] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [attendanceList, setAttendanceList] = useRecoilState(attendanceListState);
    // const attendanceData = Array(180)
    //     .fill(false)
    //     .map((_, i) => i <= 8 - 1);

    useEffect(() => {
        getAttendanceList(challengeId, setAttendanceList);
    }, [challengeId]);

    useEffect(() => {
        if (!attendanceList) return;
        // attendanceData에 일단 기한만큼 array를 채운다.
        // 그리고 시작일을 찾는다.
        // 받아온 attendanceList를 돌면서
        // attendanceData[(출석한날 - 시작일)] = true
        //
        const makeStrick = async () => {
            let tmp = Array(challenge.duration).fill(false);

            attendanceList.forEach((e) => {
                const cur = new Date(new Date(e).getFullYear(), new Date(e).getMonth(), new Date(e).getDate());
                const start = new Date(startedDate.getFullYear(), startedDate.getMonth(), startedDate.getDate());

                const diff = cur - start;

                let days = parseInt(diff / (1000 * 60 * 60 * 24));

                tmp[days] = true;
            });

            setAttendanceData(tmp);
        };
        makeStrick();
    }, [attendanceList]);

    return (
        // css 150~80일인 경우 오른쪽으로 쏠림
        <Box display={"flex"} flexFlow={"column"}>
            <div className="mt-4 max-w-2xl grid grid-flow-col grid-rows-5 grid-cols-39 gap-1">
                {attendanceData.map((attended, i) => (
                    <div key={i} className={`w-3 h-3 rounded ${attended ? "bg-damyellow" : "bg-damlightgray"}`} />
                ))}
            </div>
            <p className="text-xs text-right">
                금연 시작일 : {startedDate.toLocaleDateString()} | 목표일 수 : {challenge.duration}일
            </p>
        </Box>
    );
}

export default Strick;
