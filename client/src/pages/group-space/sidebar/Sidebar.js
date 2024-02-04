import GroupList from "./group-list/GroupList";
import ChallengeList from "./challenge-list/ChallengeList";

function Sidebar() {
    return (
        <div className="flex flex-col min-w-60 max-w-60 h-300px px-4 mr-4 border-r border-r-damlightgray/25">
            <div className="my-8">
                <GroupList />
            </div>
            <div className="my-8">
                <ChallengeList />
            </div>
        </div>
    );
}

export default Sidebar;
