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
// import arrayShuffle from "array-shuffle";
// import useResult from "../../services/utils/useResult";
import api from "../../services/api";

const ResultsTable = ({ setGameOn, shootsNumber, isGameFinished }) => {
  const [goodShoots, setGoodShoots] = useState(0);
  const [badShoots, setBadShoots] = useState(0);

  const [currentResult, setCurrentResult] = useState(0);
  const [sumShoots, setSumShoots] = useState(0);

  // const goodMessages = ["Nice Shoot!", "Wow!", "What a shooter!"];
  // const badMessages = ["Boo :(", "Do not give up!", "Try better next time!"];

  const [displayMessage, setDisplayMessage] = useState("Good luck!");
  const [showElement, setShowElement] = useState(true);

  const [result, setResult] = useState([]);

  let counter = 0;

  useEffect(() => {
    counter += 1;
    async function fetchData() {
      const response = await api.result();

      if (response.status) {
        setResult(response.data);
      } else {
        console.error("Error occur while fetching result");
      }
    }

    fetchData();
  }, [counter]);

  console.log("result", result);

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

      {showElement && <Heading>{displayMessage}</Heading>}

      <Button mt={450} onClick={() => isGameFinished && setGameOn(false)}>
        Restart game
      </Button>
    </Flex>
  );
};

export default ResultsTable;
