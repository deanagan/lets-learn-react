import { useState } from "react";

import { AccordionButton, AccordionPanel } from "../Styles/StyledComponents";

export default function Accordion() {
  // TODO: Combine to 1 object
  const [section1, setSection1] = useState();
  const [section1display, setSection1display] = useState("none");
  const [maxHeight1, setMaxHeight1] = useState(null);

  const onClickSection1 = () => {
    console.log(section1);
    console.log(section1display);
    setSection1((s) => (s === "active" ? undefined : "active"));
    setSection1display((sd) => (sd === "block" ? "none" : "block"));
    // const sibling = e.target.nextElementSibling;
    setMaxHeight1(maxHeight1 ? null : 120);
  };

  return (
    <>
      <AccordionButton className={section1} onClick={onClickSection1}>
        Section 1
      </AccordionButton>
      <AccordionPanel display={section1display} maxHeight={maxHeight1}>
        <p>Lorem ipsum...</p>
      </AccordionPanel>
    </>
  );
}
