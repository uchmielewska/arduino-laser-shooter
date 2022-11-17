import { useState } from "react";
import { Container, Heading } from "@chakra-ui/react";
import GameParameters from "../GameParameters";
import ResultsTable from "../Result";

const AppLayout = () => {
  const [isGameOn, setGameOn] = useState(false);
  const [isGameFinished, setGameFinished] = useState(false);

  const [shootsNumber, setShootsNumber] = useState(15);

  return (
    <Container flexDirection="column" justifyContent="center">
      <Heading m="6">Laser Shooting Game</Heading>
      {isGameOn ? (
        <ResultsTable
          setGameOn={setGameOn}
          shootsNumber={shootsNumber}
          isGameFinished={isGameFinished}
        />
      ) : (
        <GameParameters
          setGameOn={setGameOn}
          shootsNumber={shootsNumber}
          setShootsNumber={setShootsNumber}
        />
      )}
    </Container>
  );
};

export default AppLayout;
