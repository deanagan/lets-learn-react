import { useState } from "react";

import { Button, ColoredHeader } from "../Styles/StyledComponents";

export function UseStateNoDispatchFunction() {
  const [count, setCount] = useState(0);
  const [buttonClickCount, setButtonClickCount] = useState(0);

  const increment = () => {
    setButtonClickCount(buttonClickCount + 1);
    setTimeout(() => setCount(count + 1), 2000);
  };

  return (
    <div>
      <ColoredHeader>Click Count: {buttonClickCount}</ColoredHeader>
      <Button onClick={increment}>Increment</Button>
      <ColoredHeader>{count}</ColoredHeader>
    </div>
  );
}

export function UseStateDispatchFunction() {
  const [count, setCount] = useState(0);
  const [buttonClickCount, setButtonClickCount] = useState(0);

  const increment = () => {
    setButtonClickCount(buttonClickCount + 1);
    setTimeout(() => setCount((cc) => cc + 1), 2000);
  };

  return (
    <div>
      <ColoredHeader>Click Count: {buttonClickCount}</ColoredHeader>
      <Button onClick={increment}>Increment</Button>
      <ColoredHeader>{count}</ColoredHeader>
    </div>
  );
}
