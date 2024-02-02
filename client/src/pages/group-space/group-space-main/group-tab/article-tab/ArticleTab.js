import Evidence from "./evidence/Evidence";
import Testimony from "./testimony/Testimony";
import { VStack } from "@chakra-ui/react";

function ArticleTab() {
    return (
        <div className="ArticleTab">
            <div>증언 증거 제보 컴포넌트입니당</div>
            <VStack spacing={20} align="stretch">
                <Testimony />

                <Evidence />
            </VStack>
        </div>
    );
}

export default ArticleTab;
