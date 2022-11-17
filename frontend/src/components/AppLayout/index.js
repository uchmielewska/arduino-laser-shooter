import { useState } from "react";
import { Container, Heading } from "@chakra-ui/react";
import GameParameters from "../GameParameters";
import ResultsTable from "../Result";
import api from "../../services/api";

const AppLayout = () => {
  const [isGameOn, setGameOn] = useState(false);
  const [isGameFinished, setGameFinished] = useState(false);

  const [shootsNumber, setShootsNumber] = useState(15);

  const [goodShoots, setGoodShoots] = useState(0);
  const [badShoots, setBadShoots] = useState(0);

  const startGame = async () => {
    return api.game({
      targets: shootsNumber,
    });
  };

  //   const fetchRecipes = async () => {
  //     const response = await api.recipes();

  //     if (response.status) {
  //       setRecipes(response.data);
  //     } else {
  //       console.error("Error occur while fetching recipes");
  //     }
  //   };

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
          setGameOn={setGameOn}
          shootsNumber={shootsNumber}
          setShootsNumber={setShootsNumber}
          startGame={startGame}
        />
      )}
    </Container>
  );
};

export default AppLayout;
