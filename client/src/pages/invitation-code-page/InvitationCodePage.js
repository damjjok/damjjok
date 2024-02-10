import { joinGroup, validateInviationCode } from "apis/api/Group";
import { currentUser } from "contexts/User";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

const InvitationCodePage = () => {
    const user = useRecoilValue(currentUser);
    const navigate = useNavigate();
    const { code } = useParams();
    const enterGroup = async () => {
        const groupId = await validateInviationCode(code);
        if (!groupId) navigate("/");
        await joinGroup(groupId, [user.userId]);
        // navigate(`/group/${groupId}`);
    };
    useEffect(() => {
        console.log(user);
        // uuid값 받아와서
        // uuid로 그룹 가입 신청 넣기
        // 근데 로그인 안돼있으면 메인 페이지로 리다이렉트 시켜줌
        // 근데 로그인 한 상태로 다시 눌러야함
        // 로그인 성공했으면 uuid로 가입신처 넣고 groupId 받아와서 거기로 이동시켜주기

        if (!localStorage.getItem("accessToken")) {
            navigate("/");
            return;
        }
        enterGroup();
    }, []);
    return <></>;
};

export default InvitationCodePage;
