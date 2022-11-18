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
    "You're the best!",
    "Athens teacher is the best!",
  ];
  const badMessages = [
    "Boo :(",
    "Don't give up!",
    "Try better next time!",
    "It's not so easy...",
    "Don't worry! Christmas is coming",
  ];

  const [displayMessage, setDisplayMessage] = useState("Good luck!");
  const [showElement, setShowElement] = useState(true);

  const [isGameFinished, setIsGameFinished] = useState(false);

  const MINUTE_MS = 1000;


  useEffect(() => {
    const interval = setInterval(async () => {

      const response = await api.result();

      if (response.status) {
        setResult(response.data);

        if((response.data.hit + response.data.miss) === Number(shootsNumber)){
          setIsGameFinished(true);
          clearInterval(interval);
        }
      }

     
    }, MINUTE_MS);

    return () => clearInterval(interval);
    
  }, []);

  useEffect(() => {
    setGoodShoots(result.hit);
    setBadShoots(result.miss);
    setSumShoots(result.miss + result.hit);
  }, [result]);

  useEffect(() => {
    if (goodShoots !== 0) {
      setDisplayMessage(arrayShuffle(goodMessages)[0]);
      setShowElement(true);
    }
  }, [goodShoots]);

  useEffect(() => {
    if (badShoots !== 0) {
      setDisplayMessage(arrayShuffle(badMessages)[0]);
      setShowElement(true);
    }
  }, [badShoots]);

  useEffect(() => {
    setTimeout(function () {
      setShowElement(false);
    }, 2000);
  }, [displayMessage]);

  return (
    <Flex
      justifyContent="center"
      direction="column"
      alignContent="space-between"
    >
      {isGameFinished ? (
        <ResultSummary
          userName={userName}
          goodShoots={goodShoots}
          badShoots={badShoots}
        />
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
            sumShoots={sumShoots}
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
