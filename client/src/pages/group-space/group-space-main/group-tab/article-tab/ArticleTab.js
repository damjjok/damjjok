import Evidence from "./evidence/Evidence";
import Testimony from "./testimony/Testimony";

function ArticleTab() {
    return (
        <div className="ArticleTab">
            <div>증언 증거 제보 컴포넌트입니당</div>
            <div className="Tesimony">
                <Testimony />
            </div>
            <div className="Evidence">
                <Evidence />
            </div>
        </div>
    );
}

export default ArticleTab;
