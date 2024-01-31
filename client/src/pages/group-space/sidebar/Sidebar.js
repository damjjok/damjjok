import GroupList from "./group-list/GroupList";
import ChallengeList from "./challenge-list/ChallengeList";

function Sidebar() {
    return (
        <div className="flex flex-col min-w-48 max-w-48 h-300px pl-4 mr-4 border-r border-r-damlightgray/25">
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
