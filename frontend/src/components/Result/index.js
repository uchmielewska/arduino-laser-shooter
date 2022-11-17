import { Flex, Button, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import arrayShuffle from "array-shuffle";
import api from "../../services/api";
import ResultSummary from "../ResultSummary";
import ResultTable from "../ResultTable";

const Result = ({ setGameOn, shootsNumber, userName }) => {
  const [goodShoots, setGoodShoots] = useState(0);
  const [badShoots, setBadShoots] = useState(0);

  const [result, setResult] = useState({ hit: 0, miss: 0 });
  const [sumShoots, setSumShoots] = useState(0);

  const goodMessages = [
    "Nice Shoot!",
    "Wow!",
    "What a shooter!",
    "Your the best!",
  ];
  const badMessages = [
    "Boo :(",
    "Do not give up!",
    "Try better next time!",
    "Your the worst...",
  ];

  const [displayMessage, setDisplayMessage] = useState("Good luck!");
  const [showElement, setShowElement] = useState(true);

  const [isGameFinished, setIsGameFinished] = useState(false);

  const MINUTE_MS = 1000;

  useEffect(() => {
    if (!isGameFinished) {
      if (sumShoots !== shootsNumber) {
        const interval = setInterval(async () => {
          const response = await api.result();
          if (response.status) {
            setResult(response.data);
          }
        }, MINUTE_MS);

        return () => clearInterval(interval);
      } else {
        setIsGameFinished(true);

        goodShoots > badShoots
          ? setDisplayMessage("Fantastic result!")
          : setDisplayMessage("Next time will be better!");
      }
    }
  }, []);

  useEffect(() => {
    setGoodShoots(result.hit);
    setBadShoots(result.miss);
    setSumShoots(result.miss + result.hit);
  }, [result]);

  useEffect(() => {
    if (goodShoots !== 0) {
      setDisplayMessage(arrayShuffle(goodMessages)[0]);
    }
  }, [goodShoots]);

  useEffect(() => {
    if (badShoots !== 0) {
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
      {isGameFinished ? (
        <ResultSummary />
      ) : (
        <Flex
          justifyContent="center"
          direction="column"
          alignContent="space-between"
        >
          <ResultTable
            userName={userName}
            shootsNumber={shootsNumber}
            goodShoots={goodShoots}
            badShoots={badShoots}
          />
        </Flex>
      )}

      {showElement && <Heading position="absolute">{displayMessage}</Heading>}

      <Button mt={400} onClick={() => isGameFinished && setGameOn(false)}>
        Restart game
      </Button>
    </Flex>
  );
};

export default Result;
