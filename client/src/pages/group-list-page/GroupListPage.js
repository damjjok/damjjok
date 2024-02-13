import { useState, useEffect } from "react";
import { Button, useDisclosure, HStack, Wrap, WrapItem, Box, useBreakpointValue } from "@chakra-ui/react";
import CreateGroupModal from "./modal/CreateGroupModal";
import logo from "assets/images/logo.png";
import landingBg from "assets/images/bgimg.png";
import { useRecoilValue } from "recoil";
import { myFriendState } from "contexts/Search";
import { getGroupList, postCreateGroup } from "apis/api/Group";
import { useNavigate } from "react-router-dom";

const GroupListPage = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });

    const [groupData, setGroupData] = useState([]);
    const [groupName, setGroupName] = useState(""); // 그룹 이름 상태 추가
    const { isOpen, onOpen, onClose } = useDisclosure();
    const groupList = useRecoilValue(myFriendState);

    const navigate = useNavigate(); // 네비게이트 함수 사용

    const handleGroupClick = (groupId) => {
        navigate(`/group/${groupId}/`); // 해당 그룹 ID의 경로로 이동
    };

    // 그룹 데이터를 가져오는 함수
    useEffect(() => {
        // 함수를 실행합니다.
        fetchGroupData();
    }, []); // 빈 배열을 넘겨주어 컴포넌트 마운트 시에만 실행되도록 합니다.
    const fetchGroupData = async () => {
        try {
            // getGroupList 함수를 호출하여 데이터를 가져옵니다.
            const response = await getGroupList();
            // 가져온 데이터를 groupData 상태에 저장합니다.
            setGroupData(response.list);
        } catch (error) {
            console.error("그룹 리스트를 불러오는 데 실패했습니다:", error);
        }
    };

    const handleCreateGroup = async () => {
        if (!groupName.trim()) {
            alert("그룹 이름을 입력해주세요.");
            return;
        }

        const userIds = groupList.map((user) => ({ userId: user.userId }));

        try {
            const newGroup = await postCreateGroup(groupName, userIds);
            if (newGroup) {
                // setGroupData((prevGroupData) => [...prevGroupData, newGroup]);
                fetchGroupData();
                setGroupName(""); // 입력 필드 초기화
                onClose(); // 모달 닫기
            }
        } catch (error) {
            console.error("그룹 생성 중 에러 발생:", error);
        }
    };

    return (
        <div
            className="CreateGroup"
            style={{
                position: "relative",
                height: "100vh",
                width: "100vw",
            }}
        >
            <div
                style={{
                    backgroundImage: `url(${landingBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 2,
                }}
            />
            <div style={{ zIndex: 3 }}>
                <img
                    src={logo}
                    alt="logoImg"
                    style={{
                        position: "absolute", // 절대 위치를 사용하여 부모 div에 대해 위치 지정
                        top: "20px", // 상단에서 20px 떨어진 위치
                        left: "20px", // 왼쪽에서 20px 떨어진 위치
                        zIndex: 10, // 다른 요소들 위에 오도록 zIndex 값 설정
                    }}
                />

                <>
                    <p
                        style={{
                            color: "white",
                            marginBottom: "4rem",
                            fontSize: "4rem",
                            textAlign: "center",
                        }}
                    >
                        그룹 선택하기
                    </p>
                    <Box height={isMobile ? "50vh" : "100%"} overflowY={"auto"}>
                        <Wrap spacing={10} justify="center">
                            {groupData.map((group, index) => (
                                <WrapItem key={index}>
                                    <Button
                                        // onClick={onOpen}
                                        key={index}
                                        size="xl" // 버튼 크기
                                        fontSize="2rem" // 글자 크기
                                        colorScheme="blue" // 버튼 색상 스킴
                                        px={2} // 좌우 패딩
                                        py={2} // 상하 패딩
                                        bg="#ffd100"
                                        width="10rem"
                                        height="10rem"
                                        onClick={() => handleGroupClick(group.groupId)}
                                        style={{
                                            whiteSpace: "normal", // 텍스트가 필요에 따라 줄바꿈되도록 설정
                                            overflow: "hidden", // 내용이 넘칠 경우 숨김
                                            textOverflow: "ellipsis", // 내용이 넘칠 경우 말줄임표로 표시 (여러 줄에 대해서는 작동하지 않음)
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center", // 텍스트를 버튼 중앙에 정렬
                                            alignItems: "center", // 가로축 중앙 정렬
                                        }}
                                    >
                                        {group.groupname}
                                    </Button>
                                </WrapItem>
                            ))}
                            <WrapItem>
                                <Button
                                    onClick={onOpen}
                                    width="10rem"
                                    height="10rem"
                                    fontSize="4rem" // 글자 크기
                                    colorScheme="blue" // 버튼 색상 스킴
                                    px={10} // 좌우 패딩
                                    py={7} // 상하 패딩
                                    bg="#ffd100"
                                >
                                    +
                                </Button>
                            </WrapItem>
                        </Wrap>
                    </Box>
                </>

                <CreateGroupModal isOpen={isOpen} onClose={onClose} groupName={groupName} setGroupName={setGroupName} onGroupCreate={handleCreateGroup} />
            </div>
        </div>
    );
};

export default GroupListPage;
