import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";

const GameParameters = ({ startGame, setGameOn, setShootsNumber }) => {
  return (
    <Flex
      justifyContent="center"
      direction="column"
      alignContent="space-between"
    >
      <Text m="2" color="pink.600" as="b">
        Set number of shoots
      </Text>
      <NumberInput
        size="lg"
        defaultValue={15}
        min={5}
        max={50}
        allowMouseWheel
        onChange={(e) => setShootsNumber(e)}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Button
        m="4"
        onClick={() => {
          startGame();
          setGameOn();
        }}
      >
        Start Game
      </Button>
    </Flex>
  );
};

export default GameParameters;
