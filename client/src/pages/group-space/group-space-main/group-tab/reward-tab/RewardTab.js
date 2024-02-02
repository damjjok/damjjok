import PiggyBank from "./piggy-bank/PiggyBank";
import RewardBox from "./reward-box/RewardBox";

function RewardTab() {
    return (
        <div>
            <h1 className="text-xl font-bold">금연 저금통</h1>
            <PiggyBank />
            <p className="text-xl font-bold">나의 리워드</p>
            <RewardBox />
        </div>
    );
}

export default RewardTab;
