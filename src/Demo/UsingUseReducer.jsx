import { useCallback, useMemo, useReducer } from "react";
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

const SET_COLOR_TYPE = "SET_COLOR_TYPE";
const SET_COLOR = "SET_COLOR";

function colorReducer(state, action) {
  const { type } = action;

  switch (type) {
    case SET_COLOR_TYPE: {
      const colorType = colorMapping.find(
        (cm) => cm.name === action.colorType.name
      );
      const newAvailableColors = colorType.values;

      return {
        selectedColor: newAvailableColors[0],
        colorType: colorType,
        colors: newAvailableColors,
      };
    }

    case SET_COLOR: {
      return { ...state, selectedColor: action.color };
    }
  }
}

function initialise(initialColorType) {
  const colorType = colorMapping.find((cm) => cm.name === initialColorType);
  return {
    selectedColor: colorType.values[0],
    colorType: colorType,
    colors: colorType.values,
  };
}

function useColorType(initialColorType) {
  const [state, dispatch] = useReducer(
    colorReducer,
    initialColorType,
    initialise
  );

  const setColorType = useCallback(
    (colorType) => dispatch({ type: SET_COLOR_TYPE, colorType }),
    []
  );

  const setColor = useCallback(
    (color) => dispatch({ type: SET_COLOR, color }),
    []
  );

  return [
    state,
    {
      setColor,
      setColorType,
    },
  ];
}

export default function UsingUseReducer() {
  const [colorType, { setColor, setColorType }] =
    useColorType(ADDITIVE_COLOR_TYPE);

  const onHandleColorTypeSelection = useCallback(
    (colorType) => setColorType(colorType),
    [setColorType]
  );

  const onHandleColorSelection = useCallback(
    (color) => setColor(color),
    [setColor]
  );

  const colorTypeChoices = useMemo(
    () => colorMapping.filter((cm) => cm.name !== colorType.colorType.name),
    [colorType.colorType]
  );

  return (
    <div>
      <ColoredHeader color={colorType.selectedColor.name}>
        This header changes color (useReducer)
      </ColoredHeader>
      <DropDown
        id="color-type"
        dropDownLabelId="color-type"
        choices={colorTypeChoices}
        currentValue={colorType.colorType}
        setValues={onHandleColorTypeSelection}
      />
      <DropDown
        id="colors"
        dropDownLabelId="colors"
        choices={colorType.colors}
        currentValue={colorType.selectedColor}
        setValues={onHandleColorSelection}
      />
    </div>
  );
}
