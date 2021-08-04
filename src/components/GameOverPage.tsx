import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { routeNames } from "../constant";

export const GameOverPage = () => {
  const history = useHistory();

  const historyState = history.location.state as undefined | { score: number };
  const score = historyState?.score ?? 0;

  const handleClickRetryButton = () => {
    history.push(routeNames.play);
  }

  const handleClickGotoStartButton = () => {
    history.push(routeNames.start);
  }

  return (
    <div>
      <p>Game Over</p>
      <p>Score: {score}</p>
      <Button variant='contained' onClick={handleClickGotoStartButton}>시작화면으로</Button>
      <Button variant='contained' onClick={handleClickRetryButton}>다시하기</Button>
    </div>
  );
}