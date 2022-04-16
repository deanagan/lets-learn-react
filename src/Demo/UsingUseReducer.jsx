/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useCallback } from "react/cjs/react.production.min";

import { Button, ColoredHeader } from "../Styles/StyledComponents";

// eslint-disable-next-line no-unused-vars
const printMedium = [
  { name: "photo", uniqueId: 1 },
  { name: "monitor", uniqueId: 2 },
  { name: "television", uniqueId: 3 },
];

// Additive devices that are light emitting use RGB. Such as Computers, Television, Mobile Phone
const rgbColors = [
  { name: "red", uniqueId: 11 },
  { name: "green", uniqueId: 12 },
  { name: "blue", uniqueId: 13 },
];

// Subtractive CMYK is used for paper, items that reflect light
// eslint-disable-next-line no-unused-vars
const cmykColors = [
  { name: "cyan", uniqueId: 21 },
  { name: "magenta", uniqueId: 22 },
  { name: "yellow", uniqueId: 23 },
  { name: "black", uniqueId: 24 },
];

const SET_COLOR_TYPE = "SET_COLOR_TYPE";
const GET_AVAILABLE_COLORS = "GET_AVAILABLE_COLORS";

// eslint-disable-next-line no-unused-vars
// function colorReducer(state, action) {
//   const { colorType, availableColours } = state;
//   const { type, colorType } = action;

//   switch (type) {
//     case SET_COLOR_TYPE: {
//       if (past.length === 0) return state;

//       const previous = past[past.length - 1];
//       const newPast = past.slice(0, past.length - 1);

//       return {
//         colorType: newPast,
//         availableColours: previous,
//       };
//     }

//     case GET_AVAILABLE_COLORS: {
//       if (future.length === 0) return state;

//       const next = future[0];
//       const newFuture = future.slice(1);

//       return {
//         past: [...past, present],
//         present: next,
//         future: newFuture,
//       };
//     }
//   }
// }

// function useColour(value) {
//   const [state, dispatch] = useState({
//     colorType: "additive",
//     availableColours: rgbColors,
//   });

//   const getAvailableColours = useCallback(() => {
//     setState((currentState) => {
//       const { past, present, future } = currentState;

//       if (past.length === 0) return currentState;

//       const previous = past[past.length - 1];
//       const newPast = past.slice(0, past.length - 1);

//       return {
//         past: newPast,
//         present: previous,
//         future: [present, ...future],
//       };
//     });
//   }, []);

//   const setColorType = useCallback(() => {
//     setState((currentState) => {
//       const { past, present, future } = currentState;

//       if (future.length === 0) return currentState;

//       const next = future[0];
//       const newFuture = future.slice(1);

//       return {
//         past: [...past, present],
//         present: next,
//         future: newFuture,
//       };
//     });
//   }, []);

//   return [state, { getAvailableColours, setColorType, getColorType }];
// }
// export default function UsingUseReducer() {
//   const [currentColor, setCurrentColor] = useState("blue");
//   const [counter, setCounter] = useState(0);

//   const increment = () => {
//     setCounter((c) => c + 1);
//   };

//   return (
//     <div>
//       <ColoredHeader color={currentColor}>
//         Our current color is: {currentColor}
//       </ColoredHeader>
//       <Button onClick={increment}>{counter}</Button>
//     </div>
//   );
// }
