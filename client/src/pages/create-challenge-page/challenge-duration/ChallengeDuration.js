import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Text,
    Box,
    useBreakpointValue,
} from "@chakra-ui/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { createChallengeState } from "../../../contexts/Challenge";

function ChallengeDuration() {
    const labelStyles = {
        mt: "4",
        ml: "-4",
        fontSize: "sm",
    };

    const isMobile = useBreakpointValue({ base: true, md: false });

    const setChallenge = useSetRecoilState(createChallengeState);
    const handleSliderChange = (value) => {
        setChallenge((oldChallenge) => ({
            ...oldChallenge,
            duration: value,
        }));
    };

    return (
        <Box>
            <Slider
                onChange={handleSliderChange}
                defaultValue={30}
                min={30}
                max={180}
                step={30}
                width={isMobile ? "70vw" : "60vw"}
            >
                <SliderMark value={30} {...labelStyles}>
                    30일
                </SliderMark>
                <SliderMark value={60} {...labelStyles}>
                    60일
                </SliderMark>
                <SliderMark value={90} {...labelStyles}>
                    90일
                </SliderMark>
                <SliderMark value={120} {...labelStyles}>
                    120일
                </SliderMark>
                <SliderMark value={150} {...labelStyles}>
                    150일
                </SliderMark>
                <SliderMark
                    value={180}
                    {...labelStyles}
                    className="whitespace-nowrap"
                >
                    180일
                </SliderMark>
                <SliderTrack bg="dam.lightgray">
                    <SliderFilledTrack bg="dam.yellow" />
                </SliderTrack>
                <SliderThumb boxSize={6} />
            </Slider>
        </Box>
    );
}

export default ChallengeDuration;
