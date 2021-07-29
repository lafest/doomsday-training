import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";

const dateArr = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
];

export const App = () => {
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => setCounter((c) => c - 0.01), 10);
    return () => clearInterval(timer);
  }, [])

  return (
    <div>
      {counter}
      <div>
        {dateArr.map((date) => (
          <Button variant='contained'>{date}</Button>        
        ))}
      </div>
    </div>
  );
}
