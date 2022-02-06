import { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  margin: 5px;
  color: ${(props) => props.buttonColor};
`;

const CounterAppWrapper = styled.div`
  margin-top: 150px;
`;

export default function CounterApp({ usesMemoization = false }) {
  const [count, setCount] = useState(0);
  const [buttonTextColor, setButtonTextColor] = useState("blue");

  return (
    <CounterAppWrapper>
      <h2>Button Counter</h2>
      <Button
        buttonColor={buttonTextColor}
        onClick={() => setCount((prevCount) => prevCount + 1)}
      >
        Increment
      </Button>
      <Button onClick={() => setButtonTextColor("red")}>Red</Button>
      <Button onClick={() => setButtonTextColor("green")}>Green</Button>
      <Button onClick={() => setButtonTextColor("blue")}>Blue</Button>
      {usesMemoization ? (
        <MemoizedCounter count={count} />
      ) : (
        <Counter count={count} />
      )}
    </CounterAppWrapper>
  );
}

function Counter({ count }) {
  const renderCountRef = useRef(0);
  const renderCount = renderCountRef.current;

  useEffect(() => {
    renderCountRef.current += 1;
  });

  return (
    <div>
      <h4>Counter: Render count: {renderCount} time(s)</h4>
      <h4>Counter: Increment count: {count} time(s)</h4>
    </div>
  );
}

const MemoizedCounter = memo(Counter);
