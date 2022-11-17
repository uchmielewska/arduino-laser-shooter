import { useState } from "react";
import { Container, Heading } from "@chakra-ui/react";
import GameParameters from "../GameParameters";
import ResultsTable from "../Result";
import { startGameApi } from "../../services/utils/gameStart";

const AppLayout = () => {
  const [isGameOn, setGameOn] = useState(false);
  const [isGameFinished, setGameFinished] = useState(false);

  const [shootsNumber, setShootsNumber] = useState(15);

  const [goodShoots, setGoodShoots] = useState(0);
  const [badShoots, setBadShoots] = useState(0);

  const onGameStart = () => {
    setGameOn(true);
    startGameApi(shootsNumber);
  };

  return (
    <Container flexDirection="column" justifyContent="center">
      <Heading m="6">Laser Shooting Game</Heading>
      {isGameOn ? (
        <ResultsTable
          setGameOn={setGameOn}
          shootsNumber={shootsNumber}
          isGameFinished={isGameFinished}
          goodShoots={goodShoots}
          setGoodShoots={setGoodShoots}
          badShoots={badShoots}
          setBadShoots={setBadShoots}
        />
      ) : (
        <GameParameters
          onGameStart={onGameStart}
          setShootsNumber={setShootsNumber}
        />
      )}
    </Container>
  );
};

export default AppLayout;
