import { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import CodeDemo from "../Common/CodeDemo";
import TwoWayBindingDemo from "../Demo/TwoWayBindingDemo";
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
      "Prefer to use useReducer when an element in state relies on the value of another element.",
  },
];

// eslint-disable-next-line no-unused-vars
const structures = [
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
    ],
  },
];

export default function UseStateAndUseReducer({ slideIndex, slideOrder }) {
  // eslint-disable-next-line no-unused-vars
  const [choiceComponent, setChoiceComponent] = useState(1);

  useLayoutEffect(() => {
    setChoiceComponent(1);
    if (slideIndex.h === slideOrder && slideIndex.v === 2) {
      if (slideIndex.f === 0 || slideIndex.f === 1) {
        setChoiceComponent(2);
      } else if (slideIndex.f === 2 || slideIndex.f === 3) {
        setChoiceComponent(3);
      } else if (slideIndex.f === 4) {
        setChoiceComponent(4);
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
        <Header>Two Way Binding</Header>
        <CodeDemo structures={structures}>
          <TwoWayBindingDemo />
        </CodeDemo>
      </section>
    </section>
  );
}
