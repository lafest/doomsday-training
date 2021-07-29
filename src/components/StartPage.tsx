import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export const StartPage = () => {
  const history = useHistory();

  const handleClickStartButton = () => {
    history.push("/play")
  }

  return (
    <div>
      <Button variant='contained' onClick={handleClickStartButton}>게임 시작</Button>
    </div>
  )
}
