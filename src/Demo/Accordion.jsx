import { useState } from "react";

import { AccordionButton, AccordionPanel } from "../Styles/StyledComponents";

export default function Accordion({ buttonLabel, panelData, maxHeight = 120 }) {
  const [section, setSection] = useState();
  const [section1display, setSection1display] = useState("none");
  const [currentHeight, setCurrentHeight] = useState(null);

  const onClickSection = () => {
    setSection((s) => (s === "active" ? undefined : "active"));
    setSection1display((sd) => (sd === "block" ? "none" : "block"));
    setCurrentHeight(currentHeight ? null : maxHeight);
  };

  return (
    <>
      <AccordionButton className={section} onClick={onClickSection}>
        {buttonLabel}
      </AccordionButton>
      <AccordionPanel display={section1display} maxHeight={currentHeight}>
        {panelData}
      </AccordionPanel>
    </>
  );
}
