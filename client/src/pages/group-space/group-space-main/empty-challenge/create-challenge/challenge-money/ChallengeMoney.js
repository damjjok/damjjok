import {
  // useDisclosure,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import { challengeState } from "../../../../context/Challenge";
import { useRecoilState } from "recoil";

function ChallengeMoney() {
  const [challenge, setChallenge] = useRecoilState(challengeState);

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      const numericValue = value === "" ? "" : Number(value);
      setChallenge((oldChallenge) => ({
          ...oldChallenge,
          [name]: numericValue,
      }));
  };
  return (
      <div className="my-16">
          <p>금연 저금통 설정</p>
          <FormControl className="flex flex-col my-8 min-w-lg max-w-lg">
              <div className="flex items-end p-4">
                  <FormLabel>초기 금액</FormLabel>
                  <Input
                      name="initialMoney"
                      type="number"
                      onChange={handleInputChange}
                      value={challenge.initialMoney}
                      focusBorderColor="dam.yellow"
                      placeholder="단위(원)"
                      htmlSize={16}
                      width="auto"
                  />
                  <FormLabel>원</FormLabel>
              </div>
              <FormHelperText>
                  처음 설정할 금액을 정해주세요. 0원도 괜찮아요!
              </FormHelperText>
              <div className="flex items-end p-4">
                  <FormLabel>적립 주기</FormLabel>
                  <Input
                      name="savedPeriod"
                      type="number"
                      onChange={handleInputChange}
                      value={challenge.savedPeriod}
                      placeholder="단위(일)"
                      htmlSize={16}
                      width="auto"
                  />
                  <FormLabel>일</FormLabel>
              </div>
              <FormHelperText>
                  금액 주기를 설정해주세요. 주기마다 적금처럼 포인트가 쌓여요.
              </FormHelperText>
              <div className="flex items-end p-4">
                  <FormLabel>적립 금액</FormLabel>
                  <Input
                      name="savedMoney"
                      type="number"
                      onChange={handleInputChange}
                      value={challenge.savedMoney}
                      placeholder="단위(원)"
                      htmlSize={16}
                      width="auto"
                  />
                  <FormLabel>원</FormLabel>
              </div>
              <FormHelperText>
                  선택한 주기마다 넣을 금액을 설정해주세요. 0원도 가능해요!
              </FormHelperText>
          </FormControl>
      </div>
  );
}

export default ChallengeMoney;
