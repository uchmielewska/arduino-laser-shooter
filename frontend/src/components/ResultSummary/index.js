import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  Button,
  Text,
  Heading,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import arrayShuffle from "array-shuffle";
import api from "../../services/api";

const ResultSummary = ({ userName, goodShoots, badShoots }) => {
  return (
    <Flex
      justifyContent="center"
      direction="column"
      alignContent="space-between"
    >
      <Heading mt={10} color="pink.600" as="i">
        {userName}, your game is finished!
      </Heading>

      <Text>Summary:</Text>

      <Text>{`Correct shoots: ${goodShoots}`}</Text>
      <Text>{`Missed shoots: ${badShoots}`}</Text>
    </Flex>
  );
};

export default ResultSummary;
