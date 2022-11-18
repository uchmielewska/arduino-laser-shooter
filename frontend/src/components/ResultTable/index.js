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
  Text,
  Heading,
} from "@chakra-ui/react";

const ResultTable = ({
  userName,
  shootsNumber,
  goodShoots,
  badShoots,
  sumShoots,
}) => {
  return (
    <Flex direction="column">
      <Heading mt={10} color="pink.600" as="i">
        Go {userName}! Go! Go!
      </Heading>
      <Text mt={10} color="pink.600" as="b">
        Shooting progress: {sumShoots}/{shootsNumber}
      </Text>
      <TableContainer mt={10}>
        <Table variant="simple">
          <TableCaption>Game results</TableCaption>
          <Thead>
            <Tr>
              <Th>Correct</Th>
              <Th>Missed</Th>
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
    </Flex>
  );
};

export default ResultTable;
