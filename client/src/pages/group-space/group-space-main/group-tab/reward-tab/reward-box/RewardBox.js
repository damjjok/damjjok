import postboxMain from "assets/images/postboxMain.png";

function RewardBox() {
    return (
        <div className="flex justify-center my-8">
            <div style={{ width: "300px" }}>
                <img src={postboxMain} alt="postboxMain" />
            </div>
        </div>
    );
}

export default RewardBox;
