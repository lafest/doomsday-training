import { Button } from "@material-ui/core";
import { formatISO, getDay, parse } from "date-fns";
import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { useHistory } from "react-router-dom";
import { routeNames } from "../constant";

const dateArr = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
];

const generateRandomDate = () => {
  const randomTimeStampString = (new Date().valueOf() * Math.random()).toFixed(0);
  return parse(randomTimeStampString, 'T', new Date());
}

export const GamePage = () => {
  const history = useHistory();

  const [counter, setCounter] = useState(10);
  const [countDown, setCountDown] = useState(3);

  const [answer, setAnswer] = useState<Date | null>(null);

  const day = answer && getDay(answer)

  const [score, setScore] = useState(0);
  
  const counterIntervalRef = useRef<NodeJS.Timer | null>(null);
  const countDownRef = useRef<NodeJS.Timer | null>(null);

  const startCounterInterval = useCallback(() => {
    if (counterIntervalRef.current !== null) {
      return;
    }

    counterIntervalRef.current = setInterval(() => {
      setCounter(c => c - 0.1 > 0 ? c - 0.1 : 0);
    }, 100);
  }, [])

  useEffect(() => {
    if (countDownRef.current === null) {
      countDownRef.current = setInterval(() => {
        setCountDown(c => c - 1);
      }, 1000);
    }

    if (countDown <= 0) {
      clearInterval(countDownRef.current);
      countDownRef.current = null;

      setAnswer(generateRandomDate());
      startCounterInterval();
    }

  }, [countDown, startCounterInterval]);

  const stopCounterInterval = useCallback(() => {
    if (counterIntervalRef.current === null) {
      return;
    }

    clearInterval(counterIntervalRef.current);
    counterIntervalRef.current = null;
  }, [])

  const handleGameOver = useCallback(() => {
    stopCounterInterval();
    history.push(routeNames.gameOver, { score })
  }, [history, score, stopCounterInterval])

  useEffect(() => {
    if (counter <= 0) {
      handleGameOver();
    }
  }, [counter, history, handleGameOver])

  const handleSelectCorrectAnswer = useCallback(() => {
    setScore((c) => c + 1);
    setCounter(10);
    setAnswer(generateRandomDate());
  }, [])

  const handleClickDateButton = useCallback((idx: number) => {
    if (day === idx) {
      handleSelectCorrectAnswer();
      return;
    }
    handleGameOver();
  }, [handleGameOver, day, handleSelectCorrectAnswer])

  const targetDateDisplay = useMemo(() => answer !== null ? formatISO(answer, { representation: 'date' }) : 'ready...', [answer]);

  return (
    <>
      <CountDown countDown={countDown} />
      <div key='targetDateDisplay'>
        {targetDateDisplay}
      </div>
      <div>
        점수 : {score}
      </div>
      <div>
        남은 시간 : {counter.toFixed(1)}
      </div>
      <div>
        {dateArr.map((date, idx) => (
          <Button
            key={idx}
            style={{
              backgroundColor: idx === day ? 'red' : 'white'
            }}
            variant='contained'
            onClick={() => handleClickDateButton(idx)}>
              {date}
          </Button>        
        ))}
      </div>
    </>
  );
}

const CountDown = memo(({ countDown }: { countDown: number }) => (
  <div key="countDown">
    {countDown}
  </div>
))