import { useState } from "react";

import { BlockInput, ColoredHeader } from "../Styles/StyledComponents";

export default function TwoWayBindingDemo() {
  const [currentColor, setCurrentColor] = useState("blue");

  return (
    <div>
      <ColoredHeader color={currentColor}>
        Our current color is: {currentColor}
      </ColoredHeader>
      <BlockInput
        value={currentColor}
        onChange={(e) => setCurrentColor(e.target.value)}
      />
    </div>
  );
}
