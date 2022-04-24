import { useEffect, useRef, useState } from "react";

import {
  Dropbtn,
  DropDownContent,
  DropDownItem,
  DropDownLi,
} from "../Styles/StyledComponents";

function DropDown({ choices, currentValue, setValues, dropDownLabelId }) {
  const [currentEntry, setCurrentEntry] = useState(currentValue);
  const [clickedOutside, setClickedOutside] = useState(true);
  const [dropDownLabel, setDropDownLabel] = useState("");
  const currentComponentRef = useRef(null);

  const handleClickOutside = (e) => {
    const current = currentComponentRef.current;
    if (!current?.contains(e.target)) {
      setClickedOutside(true);
    }
  };

  useEffect(() => {
    setCurrentEntry(currentValue);
  }, [currentValue]);

  const onSelectHandler = (entry) => {
    setCurrentEntry(entry.name);
    setValues(entry.name);
  };

  useEffect(() => {
    setDropDownLabel(
      dropDownLabelId
        .replace("-", " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
  }, [dropDownLabelId]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickInside = () => setClickedOutside(false);
  return (
    <div style={{ marginBottom: "35px" }}>
      <label style={{ display: "block" }} htmlFor={dropDownLabelId}>
        {dropDownLabel}
      </label>
      <DropDownLi>
        <Dropbtn onClick={handleClickInside}>{currentEntry}</Dropbtn>
        {!clickedOutside ? (
          <DropDownContent ref={currentComponentRef}>
            {choices.map((pe) => (
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
    </div>
  );
}

export default DropDown;
