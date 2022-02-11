import { useEffect, useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  margin: 5px;
  color: ${(props) => props.buttonColor};
`;

const Controls = styled.div`
  position: relative;
`;

const ColorInfo = styled.div`
  width: 450px;
`;

const colorChoices = [
  { uniqueId: 1, name: "red" },
  { uniqueId: 2, name: "green" },
  { uniqueId: 3, name: "blue" },
];

export default function ColorAndCountDemo() {
  const [colorAndCount, setColorAndCount] = useState(() => ({
    count: 0,
    color: colorChoices.find((c) => c.name === "blue"),
  }));

  const setColor = (color) => {
    setColorAndCount((ccc) => ({
      count: ccc.count,
      color: colorChoices.find((c) => c.name === color),
    }));
  };

  const incrementCount = () => {
    setColorAndCount((ccc) => ({ count: ccc.count + 1, color: ccc.color }));
  };

  return (
    <div>
      <Controls>
        <button type="button" onClick={incrementCount}>
          Increment
        </button>
        <Button onClick={() => setColor("red")}>Red</Button>
        <Button onClick={() => setColor("green")}>Green</Button>
        <Button onClick={() => setColor("blue")}>Blue</Button>
      </Controls>
      <ColorAndCountComponent colorAndCount={colorAndCount} />
    </div>
  );
}

function ColorAndCountComponent({ colorAndCount }) {
  const [color, setColor] = useState("");
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount((c) => c + 1);
    if (colorAndCount) {
      const { count, color } = colorAndCount;
      setCount(count);
      setColor(color.name);
    }
  }, [colorAndCount]);

  return (
    <>
      <div>Render Count: {renderCount}</div>
      <ColorInfo style={{ color }}>
        Color: {color} Count: {count}
      </ColorInfo>
    </>
  );
}
