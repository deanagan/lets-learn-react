import { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import CodeDemo from "../Common/CodeDemo";
import UsingUseContextDemo from "../Demo/UsingUseContextDemo";
import UsingUseContextPropDrillDemo from "../Demo/UsingUseContextPropDrillDemo";
import { dedentStrUsing1stLineIndent } from "../Utils/util";

const Header = styled.h3`
  && {
    text-transform: none;
  }

  margin-top: 200px;
`;

const whatUseContext = [
  {
    uniqueId: uuidv4(),
    value: "useContext can be used to avoid prop drilling or threading.",
  },
];

const useContextCodes = [
  {
    uniqueId: uuidv4(),
    sandboxlink:
      "https://codesandbox.io/s/usememo-and-usecallback-qvehl?file=/src/App.js",
    gitlink:
      "https://github.com/deanagan/react-snippets/tree/main/usememo-color",

    lineNumbers: "",
    description: "",
    codes: [
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
        src: dedentStrUsing1stLineIndent(`
        export default function UsingUseContextPropDrillDemo() {
          // ... code
          return (
            <div style={{ display: "block" }}>
              <ColoredHeader color={colorTypeSetting.selectedColor.name}>
                This header changes color (Prop Drilling)
              </ColoredHeader>
              <DropDown
                id="color-type"
                dropDownLabelId="color-type"
                choices={colorTypeChoices}
                currentValue={colorTypeSetting.colorType}
                setValues={onHandleColorTypeSelection}
              />
              <DropDown
                id="colors"
                dropDownLabelId="colors"
                choices={colorTypeSetting.colors}
                currentValue={colorTypeSetting.selectedColor}
                setValues={onHandleColorSelection}
              />
              <DescriptionAccordions
                colors={colorTypeSetting.colors}
                colorType={colorTypeSetting.colorType}
              />
            </div>
          );
        }
        `),
      },
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
        description:
          "We have DescriptionAccordions component which has to accept a prop so it can pass it on to the color and detail accordion",
        src: dedentStrUsing1stLineIndent(`
          function ColorAccordion({ colors }) {
            const memoizedColors = useMemoObjCompare(colors);
            const panelData = useMemo(() => {
              const data = memoizedColors.map((fcm) => fcm.name).join(", ");
              return <p style={{ fontSize: "15px" }}>{data}</p>;
            }, [memoizedColors]);

            return (
              <Accordion buttonLabel="Colors" panelData={panelData} maxHeight={120} />
            );
          }

          function DetailAccordion({ colorType }) {
            const panelData = useMemo(() => {
              const fontSize = "15px";
              return colorType.name === SUBTRACTIVE_COLOR_TYPE ? (
                <>
                  <p style={{ fontSize }}>
                    Subtractive colors are created by completely or partially absorbing
                    <br />
                    some light wavelengths and reflecting others.
                  </p>
                </>
              ) : (
                <p style={{ fontSize }}>
                  Additive colors are created by adding colored light to black.
                </p>
              );
            }, [colorType]);

            return (
              <Accordion buttonLabel="Detail" panelData={panelData} maxHeight={120} />
            );
          }

          function DescriptionAccordions({ colors, colorType }) {
            return (
              <>
                <p>Information</p>
                <ColorAccordion colors={colors} />
                <DetailAccordion colorType={colorType} />
              </>
            );
          }
        `),
      },
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
        description:
          "First step is we create a reducer or a simple use state, depending on what we need.",
        src: dedentStrUsing1stLineIndent(`
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
              throw new Error("Unhandled action type");
            }
          }
        }
        `),
      },
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
        description:
          "We create a color provider. This uses the reducer we created previously. This provider returns a ColorContext.Provider JSX.",
        src: dedentStrUsing1stLineIndent(`
        import React, { createContext, useReducer } from "react";

        const ColorContext = createContext();

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
        `),
      },
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
        description:
          "Finally, we create our useColorContext hook, passing in the ColorContext we created.",
        src: dedentStrUsing1stLineIndent(`
        import React, { useContext } from "react";

        function useColorContext() {
          const context = useContext(ColorContext);
          if (context === undefined) {
            throw new Error("useColorContext must be used within a Provider");
          }

          return context;
        }

        // Helper functions for dispatch
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
        `),
      },
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
        description:
          "Now, we need to wrap the elements that need to access the context.",
        src: dedentStrUsing1stLineIndent(`
        export default function UsingUseContextDemo() {
          const initialColorType = colorMapping.find(
            (cm) => cm.name === ADDITIVE_COLOR_TYPE
          );
          const initialAvailableColors = initialColorType.values;
          const initialColor = initialAvailableColors[0];
          const colorTypeChoices = useMemo(() => colorMapping.map((cm) => cm.name), []);

          return (
            <ColorProvider
              initialColorType={initialColorType}
              colorTypeChoices={colorTypeChoices}
              initialAvailableColors={initialAvailableColors}
              initialColor={initialColor}
            >
              <ColorContextComponentUser />
            </ColorProvider>
          );
        }

        function ColorContextComponentUser() {
          const {
            state: { colors, colorType, selectedColor },
            dispatch,
          } = useColorContext();

          // ... other codes

          // The second dropdown calls this to set the selected color
          const onHandleColorSelection = useCallback(
            (color) => setSelectedColor(dispatch, color),
            [dispatch]
          );

          return (
            <div style={{ display: "block" }}>
              <ColoredHeader color={selectedColor.name}>
                This header changes color (using context)
              </ColoredHeader>
              <DropDown
                id="color-type"
                dropDownLabelId="color-type"
                choices={colorTypeChoices}
                currentValue={colorType}
                setValues={onHandleColorTypeSelection}
              />
              <DropDown
                id="colors"
                dropDownLabelId="colors"
                choices={colors}
                currentValue={selectedColor}
                setValues={onHandleColorSelection}
              />
              {/* We don't need to pass in the props here anymore */}
              <DescriptionAccordions />
            </div>
          );
        `),
      },
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
        description:
          "We now then use the useColorContext hook to get the values.",
        src: dedentStrUsing1stLineIndent(`
        function DescriptionAccordions() {
          return (
            <>
              <p>Information</p>
              <ColorAccordion />
              <DetailAccordion />
            </>
          );
        }

        function ColorAccordion() {
          const {
            state: { colors },
          } = useColorContext();

          const panelData = useMemo(() => {
            const data = colors.map((c) => c.name).join(", ");
            return <p style={{ fontSize: "15px" }}>{data}</p>;
          }, [colors]);

          return (
            <Accordion buttonLabel="Colors" panelData={panelData} maxHeight={120} />
          );
        }

        function DetailAccordion() {
          const {
            state: { colorType },
          } = useColorContext();

          const panelData = useMemo(() => {
            const fontSize = "15px";
            return colorType.name === SUBTRACTIVE_COLOR_TYPE ? (
              <>
                <p style={{ fontSize }}>
                  Subtractive colors are created by completely or partially absorbing
                  <br />
                  some light wavelengths and reflecting others.
                </p>
              </>
            ) : (
              <p style={{ fontSize }}>
                Additive colors are created by adding colored light to black.
              </p>
            );
          }, [colorType.name]);

          return (
            <Accordion buttonLabel="Detail" panelData={panelData} maxHeight={120} />
          );
        }
        `),
      },
    ],
  },
];

export default function UseContext({ slideIndex, slideOrder }) {
  const [isPropDrilled, setIsPropDrilled] = useState(true);
  useLayoutEffect(() => {
    if (slideIndex.h === slideOrder && slideIndex.v >= 1) {
      setIsPropDrilled(slideIndex.f <= 0);
    }
  }, [slideIndex.h, slideIndex.f, slideIndex.v, slideOrder, slideIndex]);

  return (
    <section>
      <section>
        <Header>useContext</Header>
        <ul>
          {whatUseContext.map((e) => (
            <li className="fragment" key={e.uniqueId}>
              {e.value}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <Header>useContext Demo</Header>
        <CodeDemo structures={useContextCodes}>
          {isPropDrilled ? (
            <UsingUseContextPropDrillDemo />
          ) : (
            <UsingUseContextDemo />
          )}
        </CodeDemo>
      </section>
    </section>
  );
}
