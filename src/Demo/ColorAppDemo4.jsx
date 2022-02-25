import "./styles.css";

import { useCallback, useMemo, useState } from "react";

import ColorDropDown from "./ColorDropDown";
import PrimaryColors from "./PrimaryColors";
import { Button, ColoredHeader } from "./StyledComponents";

const colors = [
  { name: "red", uniqueId: 1 },
  { name: "green", uniqueId: 2 },
  { name: "blue", uniqueId: 3 },
  { name: "orange", uniqueId: 4 },
  { name: "yellow", uniqueId: 5 },
  { name: "violet", uniqueId: 6 },
];

const favoriteColors = ["red", "green", "blue"];
const getColorType = (color) =>
  ["red", "blue", "green"].includes(color) ? "PRIMARY" : "NON PRIMARY";

export default function ColorAppV4() {
  const [currentColor, setCurrentColor] = useState("blue");
  const [counter, setCounter] = useState(0);
  const setToGreen = () => setToOtherColor("green");
  const setToRed = () => setToOtherColor("red");
  const setToBlue = () => setToOtherColor("blue");
  const incrementCount = () => setCounter(counter + 1);
  const setToOtherColor = useCallback((color) => setCurrentColor(color), []);

  const colorChoices = useMemo(() => {
    return colors.filter((c) => c.name !== currentColor);
  }, [currentColor]);

  return (
    <div className="App">
      <ColoredHeader color={currentColor}>
        I change color. Counter: {counter}
      </ColoredHeader>
      <h2>Change the color using the buttons or the drop down!</h2>

      <Button onClick={setToRed}>Red</Button>
      <Button onClick={setToGreen}>Green</Button>
      <Button onClick={setToBlue}>Blue</Button>
      <Button onClick={incrementCount}>Increment Counter</Button>
      <div>Color Type: {getColorType(currentColor)}</div>

      <ColorDropDown
        colorChoices={colorChoices}
        currentColor={currentColor}
        setToColor={setToOtherColor}
      />

      <PrimaryColors colors={favoriteColors} />
    </div>
  );
}
