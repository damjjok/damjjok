import { useRecoilValue } from "recoil";
import { currentGroupState } from "../../../../contexts/User";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

//테스트를 위한 더미 데이터
const groupItems = ["우리끼리만든그룹", "E106", "E107"];

function GroupList() {
    useEffect(() => {
        // console.log("userId 로 그룹 목록을 불러 옵니다.");
        // TODO : 지호가 로그인 완성하면 Token에서 사용자 정보 알아내서 그걸로 그룹 목록 불러오기
    });
    // react-select 활용을 위한 option 배열 만들기
    const options = groupItems.map((item, index) => ({
        value: item,
        label: item,
    }));
    const currentGroup = useRecoilValue(currentGroupState);
    // 더미데이터이므로 더미데이터[0]으로 초기값 설정, 이후 props나 recoilstate 기반으로 선택한 그룹명이 표시될 수 있도록 수정해야 함
    const [selectedGroup, setSelectedGroup] = useState(options[0]);

    // 나중에 styledComponent로 분리해줄 것.
    const customStyles = {
        control: (base, state) => ({
            ...base,
            backgroundColor: "#FFD100",
            borderColor: "white", // 프레임 색상을 흰색으로 설정
            boxShadow: state.isFocused ? 0 : 0, // 포커스 시 테두리 색상 제거

            "&:hover": {
                borderColor: "white", // 마우스 호버 시 테두리 색상 유지
            },
        }),
        option: (styles, { isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isSelected
                    ? "#FFD100"
                    : isFocused
                    ? "rgba(255, 209, 0, 0.5)"
                    : null,
                color: "black",
                cursor: "pointer",
                "&:hover": {
                    backgroundColor: "rgba(255, 209, 0, 0.5)",
                },
            };
        },
        dropdownIndicator: (base) => ({
            ...base,
            color: "black", // dropdown indicator 색상을 흰색으로 설정
            "&:hover": {
                color: "black",
            },
        }),
        indicatorSeparator: (base) => ({
            ...base,
            backgroundColor: "black", // 구분선 색상을 흰색으로 설정
        }),
    };

    return (
        <Box flex={1} marginRight={"1rem"}>
            <Select
                placeholder={selectedGroup || currentGroup.groupName}
                options={options}
                value={selectedGroup}
                styles={customStyles}
                onChange={(selectedOption) => setSelectedGroup(selectedOption)}
                isSearchable={false}
                style={{ flex: 1 }}
            />
        </Box>
    );
}

export default GroupList;
