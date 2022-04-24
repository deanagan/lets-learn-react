import { useCallback, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ColoredHeader } from "../Styles/StyledComponents";
import DropDown from "./DropDown";

// Additive devices that are light emitting use RGB. Such as Computers, Television, Mobile Phone
const rgbColors = [
  { name: "red", uniqueId: 11 },
  { name: "green", uniqueId: 12 },
  { name: "blue", uniqueId: 13 },
];

// Subtractive CMYK is used for paper, items that reflect light
const cmykColors = [
  { name: "cyan", uniqueId: 21 },
  { name: "magenta", uniqueId: 22 },
  { name: "yellow", uniqueId: 23 },
  { name: "black", uniqueId: 24 },
];

const SUBTRACTIVE_COLOR_TYPE = "Subtractive";
const ADDITIVE_COLOR_TYPE = "Additive";

const colorMapping = [
  { name: SUBTRACTIVE_COLOR_TYPE, values: cmykColors, uniqueId: uuidv4() },
  { name: ADDITIVE_COLOR_TYPE, values: rgbColors, uniqueId: uuidv4() },
];

export default function UsingUseStateForDependentState() {
  const initialColorType = ADDITIVE_COLOR_TYPE;
  const colorMapped = colorMapping.find((cm) => cm.name === initialColorType);
  const [colors, setColors] = useState({
    currentColor: colorMapped.values[0].name,
    colorType: initialColorType,
    availableColors: colorMapped.values,
  });

  const onHandleColorTypeSelection = useCallback((colorType) => {
    const colors = colorMapping.find((cm) => cm.name === colorType);

    setColors({
      colorType: colorType,
      availableColors: colors.values,
      currentColor: colors.values[0].name,
    });
  }, []);

  const onHandleColorSelection = useCallback(
    (color) => setColors((c) => ({ ...c, currentColor: color })),
    []
  );

  const colorTypeChoices = useMemo(
    () => colorMapping.filter((cm) => cm.name !== colors.colorType),
    [colors.colorType]
  );

  return (
    <div>
      <ColoredHeader color={colors.currentColor}>
        This header changes color (useState)
      </ColoredHeader>
      <DropDown
        id="color-type"
        dropDownLabelId="color-type"
        choices={colorTypeChoices}
        currentValue={colors.colorType}
        setValues={onHandleColorTypeSelection}
      />
      <DropDown
        id="colors"
        dropDownLabelId="colors"
        choices={colors.availableColors}
        currentValue={colors.currentColor}
        setValues={onHandleColorSelection}
      />
    </div>
  );
}
