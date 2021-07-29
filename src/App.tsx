import { useEffect, useState } from "react";

export const App = () => {
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    setInterval(() => setCounter((c) => c - 0.01), 10)
  }, [])

  return (
    <div className="App">
      {counter}
    </div>
  );
}
