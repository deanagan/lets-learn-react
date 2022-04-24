import { useLayoutEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import CodeDemo from "../Common/CodeDemo";
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
        // Show me some code
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
        <Header>useState and useReducer</Header>
        <CodeDemo structures={useContextCodes}>
          <UsingUseContextPropDrillDemo />
        </CodeDemo>
      </section>
    </section>
  );
}
