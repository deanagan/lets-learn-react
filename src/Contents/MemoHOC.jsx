import { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import CodeDemo from "../Common/CodeDemo";
import CounterApp from "../Demo/MemoCompCounter";
import { dedentStrUsing1stLineIndent } from "../Utils/util";

const what = [
  {
    uniqueId: uuidv4(),
    value: "memo is the functional equivalent of PureComponent.",
  },
  {
    uniqueId: uuidv4(),
    value:
      "Checks for prop changes, and only re-renders if they are different.",
  },
  {
    uniqueId: uuidv4(),
    value:
      "Does not prevent the current component from re-rendering if its state changes.",
  },
  {
    uniqueId: uuidv4(),
    value:
      "By default, comparison is shallow but has an optional 2nd argument to provide custom comparison.",
  },
  {
    uniqueId: uuidv4(),
    value:
      "Only exists as a performance optimization. Do not rely on it to “prevent” a render, as this can lead to bugs.",
  },
  {
    uniqueId: uuidv4(),
    value:
      "Can be used with redux connect: export const Component = connect(mapStateToProps)(memo(Component))",
  },
];

const basicMemo = [
  {
    uniqueId: uuidv4(),
    text: "Basic memo",
    codes: [
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
        src: dedentStrUsing1stLineIndent(`
        export default function CounterApp() {
          const [count, setCount] = useState(0);
          const [buttonTextColor, setButtonTextColor] = useState("blue");
          return (
            <CounterAppWrapper>
              <h2>Button Counter</h2>
              <Button
                buttonColor={buttonTextColor}
                onClick={() => setCount((prevCount) => prevCount + 1)}
              >
                Increment
              </Button>
              <Button onClick={() => setButtonTextColor("red")}>Red</Button>
              <Button onClick={() => setButtonTextColor("green")}>Green</Button>
              <Button onClick={() => setButtonTextColor("blue")}>Blue</Button>
              <Counter count={count} />
            </CounterAppWrapper>
          );
        }

        function Counter({ count }) {
          const renderCountRef = useRef(0);
          const renderCount = renderCountRef.current;

          useEffect(() => {
            renderCountRef.current += 1;
          });

          return (
            <div>
              <h4>Counter: Render count: {renderCount} time(s)</h4>
              <h4>Counter: Increment count: {count} time(s)</h4>
            </div>
          );
        }
        `),
      },
      {
        uniqueId: uuidv4(),
        lineNumbers: "16,37",
        src: dedentStrUsing1stLineIndent(`
        export default function CounterApp() {
          const [count, setCount] = useState(0);
          const [buttonTextColor, setButtonTextColor] = useState("blue");
          return (
            <CounterAppWrapper>
              <h2>Button Counter</h2>
              <Button
                buttonColor={buttonTextColor}
                onClick={() => setCount((prevCount) => prevCount + 1)}
              >
                Increment
              </Button>
              <Button onClick={() => setButtonTextColor("red")}>Red</Button>
              <Button onClick={() => setButtonTextColor("green")}>Green</Button>
              <Button onClick={() => setButtonTextColor("blue")}>Blue</Button>
              <MemoizedCounter count={count} />
            </CounterAppWrapper>
          );
        }

        function Counter({ count }) {
          const renderCountRef = useRef(0);
          const renderCount = renderCountRef.current;

          useEffect(() => {
            renderCountRef.current += 1;
          });

          return (
            <div>
              <h4>Counter: Render count: {renderCount} time(s)</h4>
              <h4>Counter: Increment count: {count} time(s)</h4>
            </div>
          );
        }

        const MemoizedCounter = memo(Counter);
        `),
      },
    ],
  },
];

const Header = styled.h4`
  margin-top: 200px;
`;

export default function MemoHOC({ slideNumber, fragmentNumber, slideOrder }) {
  const [useMemoization, setUseMemoization] = useState(false);

  useEffect(() => {
    if (slideNumber.h === slideOrder) {
      if (slideNumber.v === 1) {
        setUseMemoization(fragmentNumber === 0);
      }
    }
  }, [fragmentNumber, slideNumber, slideOrder]);

  return (
    <section>
      <section>
        <h3>React.memo</h3>
        <ul>
          {what.map((e) => (
            <li className="fragment" key={e.uniqueId}>
              {e.value}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <Header>Counter App</Header>
        <CodeDemo structures={basicMemo}>
          <CounterApp usesMemoization={useMemoization} />
        </CodeDemo>
      </section>
    </section>
  );
}
