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
    Text,
} from "@chakra-ui/react";
import { stepState } from "contexts/TruthRoomSocket";

const steps = [
    { title: "First", description: "대기중" },
    { title: "Second", description: "제보 판별" },
    { title: "Third", description: "투표" },
    { title: "Fourth", description: "PASS / FAIL" },
    { title: "Fifth", description: "최후 변론" },
    { title: "Sixth", description: "벌금 결정" },
    { title: "Seventh", description: "종료" },
];

function CenterStepper() {
    const currentStep = useRecoilValue(stepState);

    return (
        <Stack>
            <Stepper size="sm" index={currentStep} gap="0" colorScheme="yellow">
                {steps.map((step, index) => (
                    <Step key={index} gap="0">
                        <StepIndicator>
                            <StepStatus complete={<StepIcon />} />
                        </StepIndicator>
                        <Text
                            textAlign="center"
                            position={"absolute"}
                            width={"5rem"}
                            left={"-1.75rem"}
                            top={"1.5rem"}
                            color={
                                index <= currentStep ? "dam.yellow" : "white"
                            }
                        >
                            {step.description}
                        </Text>

                        <StepSeparator _horizontal={{ ml: "0" }} />
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
}

export default CenterStepper;
