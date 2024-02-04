import Evidence from "./evidence/Evidence";
import Testimony from "./testimony/Testimony";
import { VStack } from "@chakra-ui/react";

function ArticleTab() {
    return (
        <div className="ArticleTab">
            <VStack spacing={64} align="stretch">
                <Testimony />

                <Evidence />
            </VStack>
        </div>
    );
}

export default ArticleTab;
