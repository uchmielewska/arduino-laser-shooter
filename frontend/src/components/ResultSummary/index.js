import {
  Flex,
  Text,
  Heading,
} from "@chakra-ui/react";

const ResultSummary = ({ userName, goodShoots, badShoots }) => {

  return (
    <Flex
      justifyContent="center"
      direction="column"
      alignContent="space-between"
    >
      <Heading mt={10} color="pink.600" as="i">
        {userName} your game is finished!
      </Heading>

      <Text as="b" mt={5}>Summary</Text>

      <Text>{`Correct shoots: ${goodShoots}`}</Text>
      <Text>{`Missed shoots: ${badShoots}`}</Text>
    </Flex>
  );
};

export default ResultSummary;
