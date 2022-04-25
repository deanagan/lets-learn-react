import React, { createContext, useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

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

const SET_SELECTED_COLOR_TYPE = "SET_SELECTED_COLOR_TYPE";
const SET_SELECTED_COLOR = "SET_SELECTED_COLOR";

const ColorContext = createContext();

function colorContextReducer(state, action) {
  switch (action.type) {
    case SET_SELECTED_COLOR_TYPE: {
      return {
        ...state,
        colorType: action.colorType,
        colors: colorMapping
          .find((cm) => cm.name === action.colorType)
          .values.map((cv) => cv.name),
      };
    }

    case SET_SELECTED_COLOR: {
      return {
        ...state,
        selectedColor: action.selectedColor,
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

let defaultInitialState = {
  colorType: "",
  selectedColor: "",
  colors: [],
  colorTypeChoices: colorMapping.map((cm) => cm.name),
};

function ColorProvider({ children, initialColorType }) {
  const colors = colorMapping
    .find((cm) => cm.name === initialColorType)
    .values.map((cv) => cv.name);

  defaultInitialState.colorType = initialColorType;
  defaultInitialState.colors = colors;
  defaultInitialState.selectedColor = colors[0];

  const [state, dispatch] = useReducer(
    colorContextReducer,
    defaultInitialState
  );

  const value = { state, dispatch };
  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
}

function useColorContext() {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error("useColorContext must be used within a Provider");
  }

  return context;
}

function setColorType(dispatch, colorType) {
  dispatch({
    type: SET_SELECTED_COLOR_TYPE,
    colorType,
  });
}

function setSelectedColor(dispatch, selectedColor) {
  dispatch({
    type: SET_SELECTED_COLOR,
    selectedColor,
  });
}

export { ColorProvider, setColorType, setSelectedColor, useColorContext };
