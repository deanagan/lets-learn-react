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
  const [colorSetting, setColorSetting] = useState(() => {
    const initialColorSetting = colorMapping.find(
      (cm) => cm.name === ADDITIVE_COLOR_TYPE
    );
    return {
      currentColor: initialColorSetting.values[0],
      colorType: initialColorSetting,
      colors: initialColorSetting.values,
    };
  });

  const onHandleColorTypeSelection = useCallback((colorType) => {
    const colorSetting = colorMapping.find((cm) => cm.name === colorType.name);

    setColorSetting({
      currentColor: colorSetting.values[0],
      colorType: colorType,
      colors: colorSetting.values,
    });
  }, []);

  const onHandleColorSelection = useCallback(
    (color) => setColorSetting((c) => ({ ...c, currentColor: color })),
    []
  );

  const colorTypeChoices = useMemo(
    () => colorMapping.filter((cm) => cm.name !== colorSetting.colorType.name),
    [colorSetting.colorType]
  );

  return (
    <div>
      <ColoredHeader color={colorSetting.currentColor.name}>
        This header changes color (useState)
      </ColoredHeader>
      <DropDown
        id="color-type"
        dropDownLabelId="color-type"
        choices={colorTypeChoices}
        currentValue={colorSetting.colorType}
        setValues={onHandleColorTypeSelection}
      />
      <DropDown
        id="colors"
        dropDownLabelId="colors"
        choices={colorSetting.colors}
        currentValue={colorSetting.currentColor}
        setValues={onHandleColorSelection}
      />
    </div>
  );
}
