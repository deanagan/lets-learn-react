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

const initialState = {
  colorType: "",
  selectedColor: "",
};

function ColorProvider({ children }) {
  const [state, dispatch] = useReducer(colorContextReducer, initialState);
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
