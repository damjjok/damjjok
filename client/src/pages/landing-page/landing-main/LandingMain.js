import logo from "assets/images/logo.png";

const LandingMain = () => {
    return (
        <div className="LandingMain">
            <img src={logo} alt="logoImg" />
            <p className="LandigTitle">"세상에 나쁜 흡연자는 없다!"</p>
            <p>
                알아요, 누구나 흡연이 건강에 안 좋다는 것을 머리로는 알지만 참
                참기 힘들다는 것을,
                <br />
                하지만, 함께라면 이겨낼 수 있지 않을까요?
                <br />
                우리 오늘부터, 함께 금연 생활을 시작해 봐요
                <br />
            </p>
        </div>
    );
};

export default LandingMain;
