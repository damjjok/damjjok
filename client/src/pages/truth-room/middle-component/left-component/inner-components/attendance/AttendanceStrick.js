import { Box, Text } from "@chakra-ui/react";

function AttendanceStrick({ startedDate }) {
    const attendanceData = Array(180)
        .fill(false)
        .map((_, i) => i <= 8 - 1);
    // 일단 누적 출석 값으로 구현
    // API 연결 후, 구체적으로 로직 수정 필요합니다.

    return (
        // css 150~80일인 경우 오른쪽으로 쏠림
        <Box className="flex flex-col over">
            <Box
                className="mt-4 max-w-2xl grid grid-flow-row grid-rows-32 grid-cols-7 gap-1 place-items-center"
                overflowY={"scroll"}
                h={"47vh"}
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
            <Text className="text-xs text-right" color={"dam.yellow"} p={1}>
                금연 시작일 : {startedDate.toLocaleDateString()}
                <br></br> 목표일 수 : {180}일<br></br>
                출석일 수 : {8}일
            </Text>
        </Box>
    );
}

export default AttendanceStrick;