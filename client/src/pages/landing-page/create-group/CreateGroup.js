import { useState, useEffect } from "react";
import { Button, useDisclosure, HStack } from "@chakra-ui/react";
import CreateGroupModal from "./create-group-modal/CreateGroupModal";
import logo from "assets/images/logo.png";
import landingBg from "assets/images/bgimg.png";
import { getGroupList, postCreateGroup } from "apis/api/Landig";

const CreateGroup = () => {
    const [groupData, setGroupData] = useState([]);
    const [groupName, setGroupName] = useState(""); // 그룹 이름 상태 추가
    const { isOpen, onOpen, onClose } = useDisclosure();

    // 그룹 데이터를 가져오는 함수
    useEffect(() => {
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

        // 함수를 실행합니다.
        fetchGroupData();
    }, []); // 빈 배열을 넘겨주어 컴포넌트 마운트 시에만 실행되도록 합니다.

    const handleCreateGroup = async () => {
        if (!groupName.trim()) {
            alert("그룹 이름을 입력해주세요.");
            return;
        }

        try {
            const newGroup = await postCreateGroup(groupName);
            if (newGroup) {
                setGroupData((prevGroupData) => [...prevGroupData, newGroup]); // 서버로부터 받은 그룹 데이터를 상태에 추가
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
                position: "relative",
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
                {groupData.length < 1 ? (
                    <>
                        <p style={{ color: "white" }}>
                            소속된 그룹이 없습니다! <br />
                            그룹을 생성하고 멤버를 초대해 주세요!
                        </p>

                        <div>
                            {/* <button onClick={onOpen}>+</button> */}

                            <Button
                                onClick={onOpen}
                                size="xl" // 버튼 크기
                                fontSize="4xl" // 글자 크기
                                colorScheme="blue" // 버튼 색상 스킴
                                px={10} // 좌우 패딩
                                py={7} // 상하 패딩
                                bg="#ffd100"
                                width="120px"
                                height="120px"
                            >
                                +
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <p style={{ color: "white" }}>그룹 선택하기</p>
                        <div>
                            <HStack spacing={4}>
                                {groupData.map((group, index) => (
                                    <Button
                                        // onClick={onOpen}
                                        key={index}
                                        size="xl" // 버튼 크기
                                        fontSize="30px" // 글자 크기
                                        colorScheme="blue" // 버튼 색상 스킴
                                        px={10} // 좌우 패딩
                                        py={7} // 상하 패딩
                                        bg="#ffd100"
                                        width="120px"
                                        height="120px"
                                    >
                                        {group.groupname}
                                    </Button>
                                ))}

                                <Button
                                    onClick={onOpen}
                                    size="xl" // 버튼 크기
                                    fontSize="4xl" // 글자 크기
                                    colorScheme="blue" // 버튼 색상 스킴
                                    px={10} // 좌우 패딩
                                    py={7} // 상하 패딩
                                    bg="#ffd100"
                                    width="120px"
                                    height="120px"
                                >
                                    +
                                </Button>
                            </HStack>
                        </div>
                    </>
                )}

                <CreateGroupModal
                    isOpen={isOpen}
                    onClose={onClose}
                    groupName={groupName}
                    setGroupName={setGroupName}
                    onGroupCreate={handleCreateGroup}
                />
            </div>
        </div>
    );
};

export default CreateGroup;
