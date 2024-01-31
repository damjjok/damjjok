import { useRecoilValue } from "recoil";
import {
    Step,
    Stack,
    StepIcon,
    StepIndicator,
    StepSeparator,
    StepStatus,
    Stepper,
    Flex,
} from "@chakra-ui/react";
import { stepState } from "contexts/TruthRoom";

const steps = [
    { title: "First", description: "대기 중" },
    { title: "Second", description: "제보 판별" },
    { title: "Third", description: "투표" },
    { title: "Fourth", description: "PASS / FAIL" },
    { title: "Fifth", description: "최후 변론" },
    { title: "Sixth", description: "벌금 결정" },
    { title: "Seventh", description: "종료" },
];

function CenterStepper() {
    const step = useRecoilValue(stepState);

    return (
        <Stack>
            <Stepper size="sm" index={step} gap="0">
                {steps.map((step, index) => (
                    <Step key={index} gap="0">
                        <Flex
                            direction="column"
                            align="center"
                            key={step.title}
                        >
                            <StepIndicator>
                                <StepStatus complete={<StepIcon />} />
                            </StepIndicator>
                            <div>{step.description}</div>
                        </Flex>
                        <StepSeparator _horizontal={{ ml: "0" }} />
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
}

export default CenterStepper;
