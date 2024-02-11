import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Box } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { getGroupList } from "apis/api/Group";

//테스트를 위한 더미 데이터
// const groupItems = ["우리끼리만든그룹", "E106", "E107"];

function GroupList({ currentGroupInfo }) {
    const [groupListData, setGroupListData] = useState([]);
    const { groupId } = useParams();
    const groupIdVal = Number(groupId);

    const navigate = useNavigate();

    const [selectedGroup, setSelectedGroup] = useState({
        value: currentGroupInfo.groupId,
        label: currentGroupInfo.groupname,
    });

    // 그룹리스트 데이터 가져오기 함수
    const fetchGroupData = async () => {
        try {
            // getGroupList 함수를 호출하여 데이터를 가져옵니다.
            const response = await getGroupList();
            // 가져온 데이터를 groupData 상태에 저장합니다.
            setGroupListData(response.list);

            const currentGroup = response.list.find(
                (group) => group.groupId === groupId
            );
            // 현재 그룹의 이름을 selectedGroup 상태에 설정합니다.
            setSelectedGroup({
                value: currentGroup?.groupId,
                label: currentGroup?.groupname,
            });
        } catch (error) {
            console.error("그룹 리스트를 불러오는 데 실패했습니다:", error);
        }
    };

    // 데이터 가져오기 함수 실행단계
    useEffect(() => {
        // 함수를 실행합니다.
        fetchGroupData();
    }, [groupId]); // URL 안의 그룹 ID가 바뀔 때 새로 데이터를 불러오는 걸로

    // 동작 함수
    const handleGroupClick = (groupId) => {
        navigate(`/group/${groupId}`); // 해당 그룹 ID의 경로로 이동
    };

    // react-select 활용을 위한 option 배열 만들기
    const options = groupListData.map((item, index) => ({
        key: index,
        value: item.groupId,
        label: item.groupname,
    }));
    // console.log(options);

    const customStyles = {
        control: (base, state) => ({
            ...base,
            backgroundColor: "#FFD100",
            borderColor: "white", // 프레임 색상을 흰색으로 설정
            boxShadow: state.isFocused ? 0 : 0, // 포커스 시 테두리 색상 제거
            fontWeight: "600",

            "&:hover": {
                borderColor: "white", // 마우스 호버 시 테두리 색상 유지
            },
        }),
        option: (styles, { isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isSelected
                    ? "rgba(255, 209, 0, 0.8)"
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
        placeholder: (defaultStyles) => {
            return {
                ...defaultStyles,
                color: "black", // 플레이스홀더 글씨 색상을 검정으로 설정
                fontWeight: "600",
            };
        },
    };

    return (
        <Box flex={1} marginRight={"1rem"}>
            <Select
                placeholder={selectedGroup.label || currentGroupInfo.groupname}
                defaultValue={selectedGroup.label || currentGroupInfo.groupname}
                options={options}
                value={selectedGroup.label}
                styles={customStyles}
                onChange={(selectedOption) => {
                    setSelectedGroup(selectedOption);
                    handleGroupClick(selectedOption.value);
                }}
                isSearchable={false}
                style={{ flex: 1 }}
            />
        </Box>
    );
}

export default GroupList;
