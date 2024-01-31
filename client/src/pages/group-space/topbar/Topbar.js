import { useRecoilValue } from "recoil";
import BasicButton from "../../../components/button/BasicButton";
import { currentUserState } from "../../../contexts/User";
import logo from "assets/images/logo.png";

function Topbar() {
    const currentUser = useRecoilValue(currentUserState);
    return (
        <div className="flex justify-between py-4 border-b border-damlightgray/25">
            <img src={logo} className="max-h-6 px-4" alt="logo" />
            <div className="flex px-4">
                <p className=" text-xs font-semibold px-2">
                    안녕하세요! {currentUser.userName} 님!
                </p>
                <BasicButton buttonName={"로그아웃"} variant={"smbtn"} />
            </div>
        </div>
    );
}

export default Topbar;
