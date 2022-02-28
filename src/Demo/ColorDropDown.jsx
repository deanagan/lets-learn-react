import { useEffect, useLayoutEffect, useRef, useState } from "react";

import {
  Comment,
  Dropbtn,
  DropDownContent,
  DropDownItem,
  DropDownLi,
} from "./StyledComponents";

function ColorDropDown({ colorChoices, currentColor, setToColor }) {
  const [currentEntry, setCurrentEntry] = useState(currentColor);
  const [clickedOutside, setClickedOutside] = useState(true);
  const currentComponentRef = useRef(null);
  const [counter, setCounter] = useState(0);

  const handleClickOutside = (e) => {
    const current = currentComponentRef.current;
    if (!current?.contains(e.target)) {
      setClickedOutside(true);
    }
  };

  useLayoutEffect(() => {
    setCounter((cv) => cv + 1);
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
    <>
      <Comment style={{ display: "block" }}>
        Dropdown UseEffect RunCount: {counter}
      </Comment>
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
    </>
  );
}

export default ColorDropDown;
