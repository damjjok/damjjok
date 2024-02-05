import { Button, useDisclosure } from "@chakra-ui/react";

import LandingMain from "./landing-main/LandingMain";
import LoginModal from "./landing-main/landing-modal/LoginModal";
import FormModal from "./landing-main/landing-modal/FormModal";
import landingBg from "assets/images/bgimg.png";

const Landing = () => {
    // const { isOpen, onOpen, onClose } = useDisclosure();
    // 만약 api연결한다면 회원가입 버튼을 눌렀을때 같은 아이디가 db에 있는지 이메
    // 이메일 형식이 맞는지 조건을 걸어줘야함
    // 그리고 state 값 axios로 회원가입 할 때 보내줘야함

    const {
        isOpen: LoginisOpen,
        onOpen: LoginonOpen,
        onClose: LoginonClose,
    } = useDisclosure();
    const {
        isOpen: FormisOpen,
        onOpen: FormonOpen,
        onClose: FormonClose,
    } = useDisclosure();

    const handleLogintoForm = () => {
        LoginonClose(); // 첫 번째 모달 닫기
        FormonOpen(); // 두 번째 모달 열기
    };

    return (
        <div
            className="Landing"
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
            <div style={{ position: "relative", zIndex: 3 }}>
                <LandingMain>
                    <Button onClick={LoginonOpen}>시작하기</Button>
                </LandingMain>

                {/* Login */}
                <LoginModal
                    LoginisOpen={LoginisOpen}
                    LoginonClose={LoginonClose}
                    LoginonOpen={LoginonOpen}
                    handleLogintoForm={handleLogintoForm}
                />
                {/* Form */}
                <FormModal
                    FormisOpen={FormisOpen}
                    FormonOpen={FormonOpen}
                    FormonClose={FormonClose}
                />
            </div>
        </div>
    );
};

export default Landing;
