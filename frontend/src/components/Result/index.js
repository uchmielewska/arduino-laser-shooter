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

const ResultsTable = ({ setGameOn, shootsNumber, isGameFinished }) => {
  const [goodShoots, setGoodShoots] = useState(0);
  const [badShoots, setBadShoots] = useState(0);

  const [result, setResult] = useState({ hit: 0, miss: 0 });
  const [sumShoots, setSumShoots] = useState(0);

  const goodMessages = ["Nice Shoot!", "Wow!", "What a shooter!"];
  const badMessages = ["Boo :(", "Do not give up!", "Try better next time!"];

  const [displayMessage, setDisplayMessage] = useState("Good luck!");
  const [showElement, setShowElement] = useState(true);

  const MINUTE_MS = 1000;

  useEffect(() => {
    if (sumShoots != shootsNumber) {
      const interval = setInterval(async () => {
        const response = await api.result();
        if (response.status) {
          setResult(response.data);
          console.log("result", response.data);
        }
      }, MINUTE_MS);

      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    setGoodShoots(result.hit);
    setBadShoots(result.miss);
    setSumShoots(result.miss + result.hit);
  }, [result]);

  useEffect(() => {
    if (goodShoots != 0) {
      setDisplayMessage(arrayShuffle(goodMessages)[0]);
    }
  }, [goodShoots]);

  useEffect(() => {
    if (badShoots != 0) {
      setDisplayMessage(arrayShuffle(badMessages)[0]);
    }
  }, [badShoots]);

  useEffect(() => {
    setTimeout(function () {
      setShowElement(false);
    }, 2000);
  }, []);

  return (
    <Flex
      justifyContent="center"
      direction="column"
      alignContent="space-between"
    >
      <Text mt={10} color="pink.600" as="b">
        Number of shoots: {shootsNumber}
      </Text>

      <TableContainer mt={10}>
        <Table variant="simple">
          <TableCaption>Game results</TableCaption>
          <Thead>
            <Tr>
              <Th>Good</Th>
              <Th>Bad</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{goodShoots}</Td>
              <Td>{badShoots}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

      {showElement && <Heading position="absolute">{displayMessage}</Heading>}

      <Button mt={450} onClick={() => isGameFinished && setGameOn(false)}>
        Restart game
      </Button>
    </Flex>
  );
};

export default ResultsTable;
