import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { challengeState } from "../../../../../../contexts/Challenge";

function ChallengeDuration() {
    const labelStyles = {
        mt: "2",
        ml: "-7.5",
        fontSize: "sm",
    };
    const [challenge, setChallenge] = useRecoilState(challengeState);
    const handleSliderChange = (value) => {
        setChallenge((oldChallenge) => ({
            ...oldChallenge,
            duration: value,
        }));
    };

    return (
        <div className="my-16 min-w-96">
            <Text textAlign={"center"} fontWeight={700}>
                챌린지 기한 설정
            </Text>
            <Slider onChange={handleSliderChange} defaultValue={challenge.duration} min={30} max={180} step={30}>
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
                <SliderMark value={180} {...labelStyles} className="whitespace-nowrap">
                    180일
                </SliderMark>
                <SliderTrack bg="dam.lightgray">
                    <SliderFilledTrack bg="dam.yellow" />
                </SliderTrack>
                <SliderThumb boxSize={6} />
            </Slider>
        </div>
    );
}

export default ChallengeDuration;
