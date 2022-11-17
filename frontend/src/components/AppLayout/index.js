import { useState } from "react";
import { Container, Heading } from "@chakra-ui/react";
import GameParameters from "../GameParameters";
import ResultsTable from "../Result";
import api from "../../services/api";

const AppLayout = () => {
  const [isGameOn, setGameOn] = useState(false);

  const [shootsNumber, setShootsNumber] = useState(15);
  const [userName, setUserName] = useState("");

  const startGame = async () => {
    return api.game({
      targetNumber: shootsNumber,
    });
  };

  return (
    <Container flexDirection="column" justifyContent="center">
      <Heading m="6">Laser Shooting Game</Heading>
      {isGameOn ? (
        <ResultsTable
          setGameOn={setGameOn}
          shootsNumber={shootsNumber}
          userName={userName}
        />
      ) : (
        <GameParameters
          setGameOn={setGameOn}
          startGame={startGame}
          setShootsNumber={setShootsNumber}
          setUserName={setUserName}
        />
      )}
    </Container>
  );
};

export default AppLayout;
