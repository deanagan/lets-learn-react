import React, { createContext, useContext, useReducer } from "react";

const SET_SELECTED_COLOR_TYPE = "SET_SELECTED_COLOR_TYPE";
const SET_SELECTED_COLOR = "SET_SELECTED_COLOR";

const ColorContext = createContext();

function colorContextReducer(state, action) {
  switch (action.type) {
    case SET_SELECTED_COLOR_TYPE: {
      return {
        ...state,
        colorType: action.colorType,
        colors: action.colors,
        selectedColor: action.colors[0],
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
  selectedColor: {},
  colors: [],
};

function ColorProvider({
  children,
  initialColorType,
  initialAvailableColors,
  initialColor,
}) {
  defaultInitialState.colorType = initialColorType;
  defaultInitialState.colors = initialAvailableColors;
  defaultInitialState.selectedColor = initialColor;

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

function setColorType(dispatch, colorType, colorChoices) {
  dispatch({
    type: SET_SELECTED_COLOR_TYPE,
    colorType,
    colors: colorChoices,
  });
}

function setSelectedColor(dispatch, selectedColor) {
  dispatch({
    type: SET_SELECTED_COLOR,
    selectedColor,
  });
}

export { ColorProvider, setColorType, setSelectedColor, useColorContext };
