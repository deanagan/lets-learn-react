import { useEffect, useRef, useState } from "react";

import { Button, ColoredHeader } from "../Styles/StyledComponents";
import ColorDropDown from "./ColorDropDown";
import PrimaryColors from "./PrimaryColors";

function useWhyDidYouUpdate(name, props) {
  const previousProps = useRef();
  const updateCount = useRef(0);
  useEffect(() => {
    if (previousProps.current) {
      // Get all keys from previous and current props
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // Use this object to keep track of changed props
      const changesObj = {};
      // Iterate through keys
      allKeys.forEach((key) => {
        // If previous is different from current
        if (previousProps.current[key] !== props[key]) {
          // Add to changesObj
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });
      // If changesObj is not empty then output to console
      if (Object.keys(changesObj).length) {
        console.log("[why-did-it-update]", name, changesObj);
        updateCount.current += 1;
        console.log("Update Count: ", updateCount.current);
      }
    }
    // Finally update previousProps with current props for next hook call
    previousProps.current = props;
  });
}

export function WhyDidYouUpdateDemo() {
  const [currentColor, setCurrentColor] = useState("blue");
  const [counter, setCounter] = useState(0);
  const setToGreen = () => setToOtherColor("green");
  const setToRed = () => setToOtherColor("red");
  const setToBlue = () => setToOtherColor("blue");
  const incrementCount = () => setCounter(counter + 1);
  const setToOtherColor = (color) => setCurrentColor(color);
  const getColorType = (color) =>
    ["red", "blue", "green"].includes(color) ? "PRIMARY" : "NON PRIMARY";
  const colors = [
    { name: "red", uniqueId: 1 },
    { name: "green", uniqueId: 2 },
    { name: "blue", uniqueId: 3 },
    { name: "orange", uniqueId: 4 },
    { name: "yellow", uniqueId: 5 },
    { name: "violet", uniqueId: 6 },
  ];
  const colorChoices = colors.filter((c) => c.name !== currentColor);
  const favoriteColors = ["red", "green", "blue"];
  return (
    <div>
      <ColoredHeader color={currentColor}>Counter: {counter}</ColoredHeader>
      <h4>
        Hit F12 and see console to find out what caused the drop down to
        re-render!
      </h4>
      <Button onClick={setToRed}>Red</Button>
      <Button onClick={setToGreen}>Green</Button>
      <Button onClick={setToBlue}>Blue</Button>
      <Button onClick={incrementCount}>Increment Counter</Button>
      <div style={{ color: currentColor }}>
        Color Type: {getColorType(currentColor)}
      </div>
      <ColorDropDownUnderCheck
        colorChoices={colorChoices}
        currentColor={currentColor}
        setToColor={setToOtherColor}
      />
      <PrimaryColors colors={favoriteColors} />
    </div>
  );
}

const ColorDropDownUnderCheck = (props) => {
  useWhyDidYouUpdate("ColorDropDown", props);
  return <ColorDropDown {...props} />;
};
