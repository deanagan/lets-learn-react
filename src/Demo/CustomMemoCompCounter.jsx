import { isEqual } from "lodash";
import { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  margin: 5px;
  color: ${(props) => props.buttonColor};
`;

export default function CustomMemoApp({ usesCustomMemo = false }) {
  const [ball, setBall] = useState({ color: "blue", weight: 0 });
  const setBallToColor = (color) => setBall((pb) => ({ ...pb, color }));
  const incrementWeight = () =>
    setBall((pb) => ({ ...pb, weight: pb.weight + 1 }));

  return (
    <div className="App">
      <h3>Custom Memo</h3>
      <Button buttonColor={ball.color} onClick={incrementWeight}>
        Increment Weight
      </Button>
      <Button onClick={() => setBallToColor("red")}>Red</Button>
      <Button onClick={() => setBallToColor("green")}>Green</Button>
      <Button onClick={() => setBallToColor("blue")}>Blue</Button>
      {usesCustomMemo ? (
        <MemoizedBallInfo ball={ball} />
      ) : (
        <BallInfo ball={ball} />
      )}
    </div>
  );
}

function BallInfoToMemo({ ball }) {
  const renderCountRef = useRef(0);
  const renderCount = renderCountRef.current;

  useEffect(() => (renderCountRef.current += 1));

  return (
    <div>
      <h4>Render count: {renderCount} time(s)</h4>
      <p>
        Color: {ball.color}, Weight: {ball.weight}
      </p>
    </div>
  );
}

const BallInfo = memo(BallInfoToMemo);
// or const MemoizedBallInfo = memo(BallInfo, (prop1, prop2) => {
//  return prop1.weight === prop2.weight && prop1.color === prop2.color;
// });

const MemoizedBallInfo = memo(BallInfo, isEqual);
// or const MemoizedBallInfo = memo(BallInfo, (prop1, prop2) => {
//  return prop1.weight === prop2.weight && prop1.color === prop2.color;
// });
