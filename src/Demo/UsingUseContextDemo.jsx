import { useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

import { ColoredHeader } from "../Styles/StyledComponents";
import Accordion from "./Accordion";
import {
  ColorProvider,
  setColorType,
  setSelectedColor,
  useColorContext,
} from "./ColorContext";
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

export const SUBTRACTIVE_COLOR_TYPE = "Subtractive";
export const ADDITIVE_COLOR_TYPE = "Additive";

const colorMapping = [
  { name: SUBTRACTIVE_COLOR_TYPE, values: cmykColors, uniqueId: uuidv4() },
  { name: ADDITIVE_COLOR_TYPE, values: rgbColors, uniqueId: uuidv4() },
];

function ColorAccordion() {
  const {
    state: { colors },
  } = useColorContext();

  const panelData = useMemo(() => {
    const data = colors.map((c) => c.name).join(", ");
    return <p style={{ fontSize: "15px" }}>{data}</p>;
  }, [colors]);

  return (
    <Accordion buttonLabel="Colors" panelData={panelData} maxHeight={120} />
  );
}

function DetailAccordion() {
  const {
    state: { colorType },
  } = useColorContext();

  const panelData = useMemo(() => {
    const fontSize = "15px";
    return colorType.name === SUBTRACTIVE_COLOR_TYPE ? (
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
  }, [colorType.name]);

  return (
    <Accordion buttonLabel="Detail" panelData={panelData} maxHeight={120} />
  );
}

function DescriptionAccordions() {
  return (
    <>
      <p>Information</p>
      <ColorAccordion />
      <DetailAccordion />
    </>
  );
}

export default function UsingUseContextDemo() {
  const initialColorType = colorMapping.find(
    (cm) => cm.name === ADDITIVE_COLOR_TYPE
  );
  const initialAvailableColors = initialColorType.values;
  const initialColor = initialAvailableColors[0];
  const colorTypeChoices = useMemo(() => colorMapping.map((cm) => cm.name), []);

  return (
    <ColorProvider
      initialColorType={initialColorType}
      colorTypeChoices={colorTypeChoices}
      initialAvailableColors={initialAvailableColors}
      initialColor={initialColor}
    >
      <ColorContextComponentUser />
    </ColorProvider>
  );
}

function ColorContextComponentUser() {
  const {
    state: { colors, colorType, selectedColor },
    dispatch,
  } = useColorContext();

  const colorTypeChoices = useMemo(
    () => colorMapping.filter((cm) => cm.name !== colorType.name),
    [colorType]
  );

  const onHandleColorTypeSelection = useCallback(
    (colorType) => {
      setColorType(dispatch, colorType, colorTypeChoices[0].values);
    },
    [colorTypeChoices, dispatch]
  );

  const onHandleColorSelection = useCallback(
    (color) => setSelectedColor(dispatch, color),
    [dispatch]
  );

  return (
    <div style={{ display: "block" }}>
      <ColoredHeader color={selectedColor.name}>
        This header changes color (using context)
      </ColoredHeader>
      <DropDown
        id="color-type"
        dropDownLabelId="color-type"
        choices={colorTypeChoices}
        currentValue={colorType}
        setValues={onHandleColorTypeSelection}
      />
      <DropDown
        id="colors"
        dropDownLabelId="colors"
        choices={colors}
        currentValue={selectedColor}
        setValues={onHandleColorSelection}
      />
      <DescriptionAccordions />
    </div>
  );
}
