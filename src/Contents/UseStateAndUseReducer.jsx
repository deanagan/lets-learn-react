import { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import CodeDemo from "../Common/CodeDemo";
import TwoWayBindingDemo from "../Demo/TwoWayBindingDemo";
import {
  UseStateDispatchFunction,
  UseStateNoDispatchFunction,
} from "../Demo/UseStateDispatchFunction.jsx";
import UsingUseReducer from "../Demo/UsingUseReducer";
import UsingUseStateForDependentState from "../Demo/UsingUseStateForDependentState";
import { dedentStrUsing1stLineIndent } from "../Utils/util";

const Header = styled.h3`
  && {
    text-transform: none;
  }

  margin-top: 200px;
`;

const whatUseStateAndUseReducer = [
  {
    uniqueId: uuidv4(),
    value:
      "Prefer to use useState in cases where we are managing a simple and independent state.",
  },
  {
    uniqueId: uuidv4(),
    value:
      "useState returns an array with two values in it, the current value, and a setter function.",
  },
  {
    uniqueId: uuidv4(),
    value: "useState is great to use for 2-way binding.",
  },
  {
    uniqueId: uuidv4(),
    value:
      "Prefer to use useState's function form in cases where the new state relies on previous state (e.g., incrementing, updating an item in array or object).",
  },
  {
    uniqueId: uuidv4(),
    value:
      "Prefer to use useReducer when an element in state relies on the value of another element.",
  },
];

const twowaybinding = [
  {
    uniqueId: uuidv4(),
    sandboxlink:
      "https://codesandbox.io/s/usememo-and-usecallback-qvehl?file=/src/App.js",
    gitlink:
      "https://github.com/deanagan/react-snippets/tree/main/usememo-color",

    lineNumbers: "",
    description:
      "ColorAppV1 is a component that has number increment, and color changing buttons and drop down form. Observe PrimaryColors always re-rendering anytime the app's local state changes. ",
    codes: [
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
        src: dedentStrUsing1stLineIndent(`
        export default function TwoWayBindingDemo() {
          const [currentColor, setCurrentColor] = useState("blue");

          return (
            <div>
              <ColoredHeader color={currentColor}>
                Our current color is: {currentColor}
              </ColoredHeader>
              <BlockInput
                value={currentColor}
                onChange={(e) => setCurrentColor(e.target.value)}
              />
            </div>
          );
        }`),
      },
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
        src: dedentStrUsing1stLineIndent(`
        export default function UseStateNoDispatchFunction() {
          const [count, setCount] = useState(0);
          const [buttonClickCount, setButtonClickCount] = useState(0);

          const increment = () => {
            setButtonClickCount(buttonClickCount + 1);
            setTimeout(() => setCount(count + 1), 2000);
          };

          return (
            <div>
              <ColoredHeader>Click Count: {buttonClickCount}</ColoredHeader>
              <Button onClick={increment}>Increment</Button>
              <ColoredHeader>{count}</ColoredHeader>
            </div>
          );
        }
        `),
      },
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
        src: dedentStrUsing1stLineIndent(`
        export default function UseStateDispatchFunction() {
          const [count, setCount] = useState(0);
          const [buttonClickCount, setButtonClickCount] = useState(0);

          const increment = () => {
            setButtonClickCount(buttonClickCount + 1);
            setTimeout(() => setCount((cc) => cc + 1), 2000);
          };

          return (
            <div>
              <ColoredHeader>Click Count: {buttonClickCount}</ColoredHeader>
              <Button onClick={increment}>Increment</Button>
              <ColoredHeader>{count}</ColoredHeader>
            </div>
          );
        }
        `),
      },
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
        src: dedentStrUsing1stLineIndent(`
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

        const SUBTRACTIVE_COLOR_TYPE = "Subtractive";
        const ADDITIVE_COLOR_TYPE = "Additive";

        const colorMapping = [
          { name: SUBTRACTIVE_COLOR_TYPE, values: cmykColors, uniqueId: uuidv4() },
          { name: ADDITIVE_COLOR_TYPE, values: rgbColors, uniqueId: uuidv4() },
        ];
        `),
      },
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
        src: dedentStrUsing1stLineIndent(`
        export default function UsingUseStateForDependentState() {
          const initialColorType = ADDITIVE_COLOR_TYPE;
          const colorMapped = colorMapping.find((cm) => cm.name === initialColorType);
          const [colors, setColors] = useState({
            currentColor: colorMapped.values[0].name,
            colorType: initialColorType,
            availableColors: colorMapped.values,
          });

          const onHandleColorTypeSelection = useCallback((colorType) => {
            const colors = colorMapping.find((cm) => cm.name === colorType);

            setColors({
              colorType: colorType,
              availableColors: colors.values,
              currentColor: colors.values[0].name,
            });
          }, []);

          const onHandleColorSelection = useCallback(
            (color) => setColors((c) => ({ ...c, currentColor: color })),
            []
          );

          const colorTypeChoices = useMemo(
            () => colorMapping.filter((cm) => cm.name !== colors.colorType),
            [colors.colorType]
          );

          return (
            <div>
              <ColoredHeader color={colors.currentColor}>
                This header changes color (useState)
              </ColoredHeader>
              <DropDown
                id="color-type"
                dropDownLabelId="color-type"
                choices={colorTypeChoices}
                currentValue={colors.colorType}
                setValues={onHandleColorTypeSelection}
              />
              <DropDown
                id="colors"
                dropDownLabelId="colors"
                choices={colors.availableColors}
                currentValue={colors.currentColor}
                setValues={onHandleColorSelection}
              />
            </div>
          );
        }
        `),
      },
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
        src: dedentStrUsing1stLineIndent(`
        const SET_COLOR_TYPE = "SET_COLOR_TYPE";
        const GET_AVAILABLE_COLORS = "GET_AVAILABLE_COLORS";
        const SET_COLOR = "SET_COLOR";

        function colorReducer(state, action) {
          const { type } = action;

          switch (type) {
            case SET_COLOR_TYPE: {
              const mappedColors = colorMapping.find(
                (cm) => cm.name === action.colorType
              );
              const newAvailableColors = mappedColors.values;

              return {
                currentColor: newAvailableColors[0].name,
                colorType: action.colorType,
                availableColors: newAvailableColors,
              };
            }

            case SET_COLOR: {
              return { ...state, currentColor: action.color };
            }

            case GET_AVAILABLE_COLORS: {
              return state;
            }
          }
        }
        `),
      },
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
        src: dedentStrUsing1stLineIndent(`
        function useColor(initialColorType) {
          const colorMapped = colorMapping.find((cm) => cm.name === initialColorType);
          const [state, dispatch] = useReducer(colorReducer, {
            currentColor: colorMapped.values[0].name,
            colorType: initialColorType,
            availableColors: colorMapped.values,
          });

          const setColorType = useCallback(
            (colorType) => dispatch({ type: SET_COLOR_TYPE, colorType }),
            []
          );

          const setColor = useCallback(
            (color) => dispatch({ type: SET_COLOR, color }),
            []
          );

          return [
            state,
            {
              setColor,
              setColorType,
            },
          ];
        }
        `),
      },
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
        src: dedentStrUsing1stLineIndent(`
        export default function UsingUseReducer() {
          const [colors, { setColor, setColorType }] = useColor(ADDITIVE_COLOR_TYPE);

          const onHandleColorTypeSelection = useCallback(
            (colorType) => setColorType(colorType),
            [setColorType]
          );

          const onHandleColorSelection = useCallback(
            (color) => setColor(color),
            [setColor]
          );

          const colorTypeChoices = useMemo(
            () => colorMapping.filter((cm) => cm.name !== colors.colorType),
            [colors.colorType]
          );

          return (
            <div>
              <ColoredHeader color={colors.currentColor}>
                This header changes color (useReducer)
              </ColoredHeader>
              <DropDown
                id="color-type"
                dropDownLabelId="color-type"
                choices={colorTypeChoices}
                currentValue={colors.colorType}
                setValues={onHandleColorTypeSelection}
              />
              <DropDown
                id="colors"
                dropDownLabelId="colors"
                choices={colors.availableColors}
                currentValue={colors.availableColors[0].name}
                setValues={onHandleColorSelection}
              />
            </div>
          );
        }
        `),
      },
    ],
  },
];

export default function UseStateAndUseReducer({ slideIndex, slideOrder }) {
  const [choiceComponent, setChoiceComponent] = useState(0);

  useLayoutEffect(() => {
    setChoiceComponent(1);
    if (slideIndex.h === slideOrder && slideIndex.v === 1) {
      if (slideIndex.f >= 4) {
        setChoiceComponent(4);
      } else if (slideIndex.f === 2 || slideIndex.f === 3) {
        setChoiceComponent(3);
      } else if (slideIndex.f === 1) {
        setChoiceComponent(2);
      } else if (slideIndex.f === 0) {
        setChoiceComponent(1);
      } else {
        setChoiceComponent(0);
      }
    }
  }, [slideIndex.h, slideIndex.f, slideIndex.v, slideOrder]);

  return (
    <section>
      <section>
        <Header>useState and useReducer</Header>
        <ul>
          {whatUseStateAndUseReducer.map((e) => (
            <li className="fragment" key={e.uniqueId}>
              {e.value}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <Header>useState and useReducer</Header>
        <CodeDemo structures={twowaybinding}>
          {choiceComponent === 0 ? (
            <TwoWayBindingDemo />
          ) : choiceComponent === 1 ? (
            <UseStateNoDispatchFunction />
          ) : choiceComponent === 2 ? (
            <UseStateDispatchFunction />
          ) : choiceComponent === 3 ? (
            <UsingUseStateForDependentState />
          ) : (
            <UsingUseReducer />
          )}
        </CodeDemo>
      </section>
    </section>
  );
}
