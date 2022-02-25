import { useEffect, useRef, useState } from "react";

import {
  Dropbtn,
  DropDownContent,
  DropDownItem,
  DropDownLi,
} from "./StyledComponents";

function ColorDropDown({ colorChoices, currentColor, setToColor }) {
  const [currentEntry, setCurrentEntry] = useState(currentColor);
  const [clickedOutside, setClickedOutside] = useState(true);
  const currentComponentRef = useRef(null);

  const handleClickOutside = (e) => {
    const current = currentComponentRef.current;
    if (!current?.contains(e.target)) {
      setClickedOutside(true);
    }
  };

  useEffect(() => {
    console.log("render drop down");
  }, [colorChoices, currentColor, setToColor]);

  useEffect(() => {
    setCurrentEntry(currentColor);
  }, [currentColor]);

  const onSelectHandler = (entry) => {
    setCurrentEntry(entry.name);
    setToColor(entry.name);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickInside = () => setClickedOutside(false);
  return (
    <DropDownLi>
      <Dropbtn onClick={handleClickInside}>{currentEntry}</Dropbtn>
      {!clickedOutside ? (
        <DropDownContent ref={currentComponentRef}>
          {colorChoices.map((pe) => (
            <DropDownItem
              key={pe.uniqueId.toString()}
              onClick={() => {
                onSelectHandler(pe);
                setClickedOutside(true);
              }}
            >
              {pe.name}
            </DropDownItem>
          ))}
        </DropDownContent>
      ) : null}
    </DropDownLi>
  );
}

export default ColorDropDown;
