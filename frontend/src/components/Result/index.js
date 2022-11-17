import { useState } from "react";
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
} from "@chakra-ui/react";

const ResultsTable = ({ setGameOn, shootsNumber, isGameFinished }) => {
  const [goodShoots, setGoodShoots] = useState(0);
  const [badShoots, setBadShoots] = useState(0);

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

      <Button mt={450} onClick={() => isGameFinished && setGameOn(false)}>
        Restart game
      </Button>
    </Flex>
  );
};

export default ResultsTable;
