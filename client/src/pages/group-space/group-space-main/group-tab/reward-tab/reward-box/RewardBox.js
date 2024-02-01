import React, { useState } from "react";
import postboxMain from "assets/images/postboxMain.png";
import { currentUserState } from "contexts/User";
import { useRecoilValue } from "recoil";
import { useDisclosure } from "@chakra-ui/react";
import RewardBoxModal from "./reward-box-modal/RewardBoxModal";

function RewardBox() {
    const currentUser = useRecoilValue(currentUserState);
    const [isHovered, setIsHovered] = useState(false);
    const { isOpen, onClose } = useDisclosure();

    return (
        <div>
            {currentUser.role === "damJJok" ? (
                <div
                    className="relative flex justify-center my-8"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="" style={{ width: "300px" }}>
                        <img
                            src={postboxMain}
                            alt="postboxMain"
                            className=" saturate-0"
                        />
                    </div>
                    <div
                        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-fit text-center py-4 bg-damlightgray transition-opacity duration-500 ${
                            isHovered ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <p className=" font-bold">
                            리워드는 챌린지가 끝난 후 확인할 수 있습니다!
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center my-8">
                    <div className="flex justify-center my-4">
                        <div style={{ width: "300px" }}>
                            <img src={postboxMain} alt="postboxMain" />
                        </div>
                    </div>
                    <RewardBoxModal isOpen={isOpen} onClose={onClose} />
                </div>
            )}
        </div>
    );
}

export default RewardBox;
