import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Text,
  Button,
  Input,
} from "@chakra-ui/react";

const GameParameters = ({ startGame, setGameOn, setShootsNumber }) => {
  return (
    <Flex
      justifyContent="center"
      direction="column"
      alignContent="space-between"
    >
      <Text my="2" color="pink.600" as="b">
        Enter your name
      </Text>
      <Input placeholder="Name" size="lg" />

      <Text my="2" color="pink.600" as="b">
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
          setGameOn(true);
        }}
      >
        Start Game
      </Button>
    </Flex>
  );
};

export default GameParameters;
