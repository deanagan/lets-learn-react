import { useLayoutEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import CodeDemo from "../Common/CodeDemo";
//import UsingUseContextDemo from "../Demo/UsingUseContextDemo";
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
    description:
      "ColorAppV1 is a component that has number increment, and color changing buttons and drop down form. Observe PrimaryColors always re-rendering anytime the app's local state changes. ",
    codes: [
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
        src: dedentStrUsing1stLineIndent(`
          export default function UsingUseContextPropDrillDemo() {
            const [colorTypeSetting, { setColor, setColorType }] =
              useColorType(ADDITIVE_COLOR_TYPE);

            const onHandleColorTypeSelection = useCallback(
              (colorType) => setColorType(colorType),
              [setColorType]
            );

            const onHandleColorSelection = useCallback(
              (color) => setColor(color),
              [setColor]
            );

            const colorTypeChoices = useMemo(
              () =>
                colorMapping.filter((cm) => cm.name !== colorTypeSetting.colorType.name),
              [colorTypeSetting.colorType.name]
            );

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
    ],
  },
];

export default function UseContext({ slideIndex, slideOrder }) {
  useLayoutEffect(() => {
    //TODO: Set action for slide Index
  }, [slideIndex.h, slideIndex.f, slideIndex.v, slideOrder]);

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
          <UsingUseContextPropDrillDemo />
        </CodeDemo>
      </section>
    </section>
  );
}
