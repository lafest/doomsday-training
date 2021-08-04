import { Button, styled } from "@material-ui/core";
import { formatISO, getDay, parse } from "date-fns";
import { useState, useEffect, useRef } from "react";
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

  }, [countDown]);

  const stopCounterInterval = () => {
    if (counterIntervalRef.current === null) {
      return;
    }

    clearInterval(counterIntervalRef.current);
    counterIntervalRef.current = null;
  }

  const handleGameOver = () => {
    stopCounterInterval();
    history.push(routeNames.gameOver, { score })
  }

  useEffect(() => {
    if (counter <= 0) {
      handleGameOver();
    }
  }, [counter, history])


  const startCounterInterval = () => {
    if (counterIntervalRef.current !== null) {
      return;
    }

    counterIntervalRef.current = setInterval(() => {
      setCounter(c => c - 0.1 > 0 ? c - 0.1 : 0);
    }, 100);
  }

  const handleSelectCorrectAnswer = () => {
    setScore((c) => c + 1);
    setCounter(10);
    setAnswer(generateRandomDate());
  }



  const handleClickDateButton = (idx: number) => {
    if (day === idx) {
      handleSelectCorrectAnswer();
      return;
    }
    handleGameOver();
  }



  return (
    <Wrapper>
      <div>
        {countDown}
      </div>
      <div>
        {answer !== null ? formatISO(answer, { representation: 'date' }) : 'ready...'}
      </div>
      <div>
        점수 : {score}
      </div>
      <div>
        남은 시간 : {counter.toFixed(1)}
      </div>
      <div>
        {dateArr.map((date, idx) => (
          <Button style={{ backgroundColor: idx === day ? 'red' : 'white'}} variant='contained' onClick={() => handleClickDateButton(idx)}>{date}</Button>        
        ))}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column'
})
