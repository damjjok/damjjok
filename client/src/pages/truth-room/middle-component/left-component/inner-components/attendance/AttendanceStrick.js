import { Box, Text } from "@chakra-ui/react";
import { getAttendanceList } from "apis/api/Attendance";
import { attendanceListState } from "contexts/Attendance";
import { challengeState } from "contexts/Challenge";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

// TODO : Challenge 정보 받아와서 시작날, 기한 받아오기
function AttendanceStrick() {
    const { challengeId } = useParams();
    const [attendanceData, setAttendanceData] = useState([]);
    const attendanceList = useRecoilValue(attendanceListState);
    const currentChallenge = useRecoilValue(challengeState);
    // const attendanceData = Array(180)
    //     .fill(false)
    //     .map((_, i) => i <= 8 - 1);

    // TODO : 이거 연결했을때도 똑바로 안나오면 사고다.
    // 그러면 요청을 통해서 받아와야한다.

    useEffect(() => {
        if (!attendanceList) return;
        // attendanceData에 일단 기한만큼 array를 채운다.
        // 그리고 시작일을 찾는다.
        // 받아온 attendanceList를 돌면서
        // attendanceData[(출석한날 - 시작일)] = true
        //
        const makeStrick = () => {
            let tmp = Array(currentChallenge.duration).fill(false);
            const startedDate = new Date(currentChallenge.createdAt);
            const start = new Date(
                startedDate.getFullYear(),
                startedDate.getMonth(),
                startedDate.getDate()
            );

            attendanceList.forEach((e) => {
                const cur = new Date(
                    new Date(e).getFullYear(),
                    new Date(e).getMonth(),
                    new Date(e).getDate()
                );

                const diff = cur - start;

                let days = parseInt(diff / (1000 * 60 * 60 * 24));

                tmp[days] = true;
            });

            setAttendanceData(tmp);
        };
        makeStrick();
    }, [attendanceList]);

    // 일단 누적 출석 값으로 구현
    // API 연결 후, 구체적으로 로직 수정 필요합니다.

    return (
        // css 150~80일인 경우 오른쪽으로 쏠림
        <Box
            className="flex flex-col over"
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Box
                className="mt-4 max-w-[10vw] grid grid-flow-row grid-rows-32 gap-3 grid-cols-5  place-items-center"
                overflowY={"scroll"}
                h={"47vh"}
                p={2}
            >
                {attendanceData.map((attended, i) => (
                    <div
                        key={i}
                        className={`w-3 h-3 rounded ${
                            attended ? "bg-damyellow" : "bg-damlightgray"
                        }`}
                    ></div>
                ))}
            </Box>
            <Text
                className="text-right"
                color={"dam.yellow"}
                p={1}
                fontSize={"0.7rem"}
            >
                금연 시작일 :{" "}
                {currentChallenge
                    ? new Date(currentChallenge.createdAt).toLocaleDateString()
                    : ""}
                <br></br> 목표일 수 :{" "}
                {currentChallenge ? currentChallenge.duration : ""}일<br></br>
                출석일 수 : {attendanceList.length}일
            </Text>
        </Box>
    );
}

export default AttendanceStrick;
