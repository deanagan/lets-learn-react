import { useCallback, useMemo, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import { ColoredHeader } from "../Styles/StyledComponents";
import Accordion from "./Accordion";
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
const GET_AVAILABLE_COLORS = "GET_AVAILABLE_COLORS";
const SET_COLOR = "SET_COLOR";

function colorReducer(state, action) {
  const { type } = action;

  switch (type) {
    case SET_COLOR_TYPE: {
      const mappedColors = colorMapping.find(
        (cm) => cm.name === action.colorType
      );
      const newAvailableColors = mappedColors.values;

      return {
        currentColor: newAvailableColors[0].name,
        colorType: action.colorType,
        availableColors: newAvailableColors,
      };
    }

    case SET_COLOR: {
      return { ...state, currentColor: action.color };
    }

    case GET_AVAILABLE_COLORS: {
      return state;
    }
  }
}

function useColor(initialColorType) {
  const colorMapped = colorMapping.find((cm) => cm.name === initialColorType);
  const [state, dispatch] = useReducer(colorReducer, {
    currentColor: colorMapped.values[0].name,
    colorType: initialColorType,
    availableColors: colorMapped.values,
  });

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

function ColorAccordion({ colors }) {
  const panelData = useMemo(() => {
    const data = colorMapping
      .filter((cm) => cm.name === colors.colorType)[0]
      .values.map((fcm) => fcm.name)
      .join(", ");
    return <p style={{ fontSize: "15px" }}>{data}</p>;
  }, [colors.colorType]);

  return (
    <Accordion buttonLabel="Colors" panelData={panelData} maxHeight={120} />
  );
}

function DetailAccordion({ colorType }) {
  const panelData = useMemo(() => {
    const fontSize = "15px";
    return colorType === SUBTRACTIVE_COLOR_TYPE ? (
      <>
        <p style={{ fontSize }}>
          Subtractive colors are created by completely or partially absorbing
          <br />
          some light wavelengths and reflecting others.
        </p>
      </>
    ) : (
      <p style={{ fontSize }}>
        Additive colors are created by adding colored light to black.
      </p>
    );
  }, [colorType]);

  return (
    <Accordion buttonLabel="Detail" panelData={panelData} maxHeight={120} />
  );
}

function DescriptionAccordions({ colors, colorType }) {
  return (
    <>
      <p>Information</p>
      <ColorAccordion colors={colors} />
      <DetailAccordion colorType={colorType} />
    </>
  );
}

export default function UsingUseContextPropDrillDemo() {
  const [colors, { setColor, setColorType }] = useColor(ADDITIVE_COLOR_TYPE);

  const onHandleColorTypeSelection = useCallback(
    (colorType) => setColorType(colorType),
    [setColorType]
  );

  const onHandleColorSelection = useCallback(
    (color) => setColor(color),
    [setColor]
  );

  const colorTypeChoices = useMemo(
    () => colorMapping.filter((cm) => cm.name !== colors.colorType),
    [colors.colorType]
  );

  return (
    <div style={{ display: "block" }}>
      <ColoredHeader color={colors.currentColor}>
        This header changes color (useReducer)
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
        currentValue={colors.availableColors[0].name}
        setValues={onHandleColorSelection}
      />
      <DescriptionAccordions colors={colors} colorType={colors.colorType} />
    </div>
  );
}
