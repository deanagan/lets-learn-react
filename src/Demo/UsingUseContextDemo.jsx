import { useCallback, useMemo } from "react";

import { ColoredHeader } from "../Styles/StyledComponents";
import Accordion from "./Accordion";
import {
  ADDITIVE_COLOR_TYPE,
  ColorProvider,
  setColorType,
  setSelectedColor,
  SUBTRACTIVE_COLOR_TYPE,
  useColorContext,
} from "./ColorContext";
import DropDown from "./DropDown";

function ColorAccordion() {
  const {
    state: { colors },
  } = useColorContext();

  const panelData = useMemo(() => {
    const data = colors.join(", ");
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
  return (
    <ColorProvider initialColorType={ADDITIVE_COLOR_TYPE}>
      <ColorContextComponentUser />
    </ColorProvider>
  );
}

function ColorContextComponentUser() {
  const {
    state: { colors, colorType, selectedColor, colorTypeChoices },
    dispatch,
  } = useColorContext();

  const onHandleColorTypeSelection = useCallback(
    (colorType) => setColorType(dispatch, colorType),
    [dispatch]
  );

  const onHandleColorSelection = useCallback(
    (color) => setSelectedColor(dispatch, color),
    [dispatch]
  );

  return (
    <div style={{ display: "block" }}>
      <ColoredHeader color={selectedColor}>
        This header changes color (useReducer)
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
