import { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import CodeDemo from "../Common/CodeDemo";
import ColorAndCountDemo from "../Demo/ColorAndCountDemo";
import { dedentStrUsing1stLineIndent } from "../Utils/util";

const Header = styled.h3`
  && {
    text-transform: none;
  }

  margin-top: 200px;
`;

const useEffectAndUseEffectLayout = [
  {
    uniqueId: uuidv4(),
    value:
      "The useEffect Hook lets you perform side effects in function components",
  },
  {
    uniqueId: uuidv4(),
    value:
      "Is equivalent to componentDidMount, componentDidUpdate, and componentWillUnmount combined from class based components",
  },
  {
    uniqueId: uuidv4(),
    value:
      "useEffect hooks are executed after render, when DOM updates have been done",
  },
  {
    uniqueId: uuidv4(),
    value:
      "useEffect is designed to handle one concern, so it is best to use multiple useEffect to separate concerns",
  },
  {
    uniqueId: uuidv4(),
    value:
      "useEffect runs both after the first render (regardless of dependency) and after every update",
  },
  {
    uniqueId: uuidv4(),
    value:
      "Because useEffect runs when its dependencies change, care must be taken to consider Javascript's referential equality rules to avoid infinite loops",
  },
  {
    uniqueId: uuidv4(),
    value:
      "useLayoutEffect runs synchronously immediately after React has performed all DOM mutations.",
  },
  {
    uniqueId: uuidv4(),
    value:
      "useLayoutEffect is useful for mutating the DOM before the browser has a chance to 'paint' the changes.",
  },
];

const structures = [
  {
    uniqueId: uuidv4(),
    text: "using objects as useEffect dependencies",
    codes: [
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
        src: dedentStrUsing1stLineIndent(`
        export default function ColorAndCountDemo() {
          const [colorAndCount, setColorAndCount] = useState(() => ({
            count: 0,
            color: colorChoices.find((c) => c.name === "blue"),
          }));

          const setColor = (color) => {
            setColorAndCount((ccc) => ({
              count: ccc.count,
              color: colorChoices.find((c) => c.name === color),
            }));
          };

          const incrementCount = () => {
            setColorAndCount((ccc) => ({ count: ccc.count + 1, color: ccc.color }));
          };

          return (
            <div>
              <Controls>
                <button type="button" onClick={incrementCount}>
                  Increment
                </button>
                <Button onClick={() => setColor("red")}>Red</Button>
                <Button onClick={() => setColor("green")}>Green</Button>
                <Button onClick={() => setColor("blue")}>Blue</Button>
              </Controls>
              <ColorAndCountComponent colorAndCount={colorAndCount} />
            </div>
          );
        }
        `),
      },
      {
        uniqueId: uuidv4(),
        lineNumbers: "28",
        src: dedentStrUsing1stLineIndent(`
        export default function ColorAndCountDemo() {
          const [colorAndCount, setColorAndCount] = useState(() => ({
            count: 0,
            color: colorChoices.find((c) => c.name === "blue"),
          }));

          const setColor = (color) => {
            setColorAndCount((ccc) => ({
              count: ccc.count,
              color: colorChoices.find((c) => c.name === color),
            }));
          };

          const incrementCount = () => {
            setColorAndCount((ccc) => ({ count: ccc.count + 1, color: ccc.color }));
          };

          return (
            <div>
              <Controls>
                <button type="button" onClick={incrementCount}>
                  Increment
                </button>
                <Button onClick={() => setColor("red")}>Red</Button>
                <Button onClick={() => setColor("green")}>Green</Button>
                <Button onClick={() => setColor("blue")}>Blue</Button>
              </Controls>
              <ColorAndCountComponent colorAndCount={colorAndCount} />
            </div>
          );
        }
        `),
      },
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
        src: dedentStrUsing1stLineIndent(`
        function ColorAndCountComponent({ colorAndCount }) {
          const [color, setColor] = useState("");
          const [count, setCount] = useState(0);
          const [renderCount, setRenderCount] = useState(0);

          useEffect(() => {
            setRenderCount((c) => c + 1);
            if (colorAndCount) {
              const { count, color } = colorAndCount;
              setCount(count);
              setColor(color.name);
            }
          }, [colorAndCount]);

          return (
            <>
              <div>Render Count: {renderCount}</div>
              <ColorInfo style={{ color }}>
                Color: {color} Count: {count}
              </ColorInfo>
            </>
          );
        }`),
      },
      {
        uniqueId: uuidv4(),
        lineNumbers: "13-16",
        src: dedentStrUsing1stLineIndent(`
        function ColorAndCountComponent({ colorAndCount }) {
          const [color, setColor] = useState("");
          const [count, setCount] = useState(0);
          const [renderCount, setRenderCount] = useState(0);

          useEffect(() => {
            setRenderCount((c) => c + 1);
            if (colorAndCount) {
              const { count, color } = colorAndCount;
              setCount(count);
              setColor(color.name);
            }
          }, [colorAndCount]);
          // We cannot change to color.count and color.color.name because
          // we check the full object for null/undefined. This is if
          // we follow the exhaustive-deps react-hooks plugin eslint rule.

          return (
            <>
              <div>Render Count: {renderCount}</div>
              <ColorInfo style={{ color }}>
                Color: {color} Count: {count}
              </ColorInfo>
            </>
          );
        }`),
      },
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
        src: dedentStrUsing1stLineIndent(`
        const useMemoObjCompare = (value) => {
          const prevRef = useRef();
          const previous = prevRef.current;
          const isObjEqual = isEqual(previous, value);
          useEffect(() => {
            if (!isObjEqual) {
              prevRef.current = value;
            }
          });
          return isObjEqual ? previous : value;
        };

        function ColorAndCountComponentWithMemo({ colorAndCount }) {
          const [color, setColor] = useState("");
          const [count, setCount] = useState(0);
          const [renderCount, setRenderCount] = useState(0);
          const colorAndCountMemo = useMemoObjCompare(colorAndCount);

          useEffect(() => {
            setRenderCount((c) => c + 1);
            if (colorAndCountMemo) {
              const { count, color } = colorAndCount;
              setCount(count);
              setColor(color.name);
            }
          }, [colorAndCountMemo]);

          return (
            <>
              <div>Render Count: {renderCount}</div>
              <ColorInfo style={{ color }}>
                Color: {color} Count: {count}
              </ColorInfo>
            </>
          );
        }`),
      },
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
        src: dedentStrUsing1stLineIndent(`
        export function useDeepCompareMemoize(value) {
          const ref = useRef(value);
          const changeTrigger = useRef(0);

          if (!isEqual(value, ref.current)) {
            ref.current = value;
            changeTrigger.current += 1;
          }
          // disable exhaustive hooks for this because we want the
          // memoization to trigger from the increment
          // eslint-disable-next-line react-hooks/exhaustive-deps
          return useMemo(() => ref.current, [changeTrigger.current]);
        }

        function isPrimitive(value) {
          return value !== Object(value);
        }

        function useDeepCompareEffect(callback, dependencies) {
          if (!dependencies || !dependencies.length) {
            throw "Invalid dependencies.";
          }

          if (dependencies.every(isPrimitive)) {
            throw "All dependencies are primitive. Just use useEffect.";
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
          return useEffect(callback, useDeepCompareMemoize(dependencies));
        }
        `),
      },
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
        src: dedentStrUsing1stLineIndent(`
        export function ColorAndCountComponentWithUseDeepEffect({ colorAndCount }) {
          const [color, setColor] = useState("");
          const [count, setCount] = useState(0);
          const [renderCount, setRenderCount] = useState(0);

          useDeepCompareEffect(() => {
            setRenderCount((c) => c + 1);
            if (colorAndCount) {
              const { count, color } = colorAndCount;
              setCount(count);
              setColor(color.name);
            }
          }, [colorAndCount]);

          return (
            <>
              <div>Render Count: {renderCount}</div>
              <ColorInfo style={{ color }}>
                Color: {color} Count: {count}
              </ColorInfo>
            </>
          );
        }`),
      },
    ],
    codeSandBoxLink:
      "https://codesandbox.io/s/lift-up-content-qgyyn?file=/src/Better.jsx:664-813",
  },
];

export default function UseEffectAndUseEffectLayout({
  slideIndex,
  slideOrder,
}) {
  const [choiceComponent, setChoiceComponent] = useState("default");

  useLayoutEffect(() => {
    if (slideIndex.h === slideOrder) {
      if (slideIndex.f === 3) {
        setChoiceComponent("useMemoCompare");
      } else if (slideIndex.f === 4 || slideIndex.f === 5) {
        setChoiceComponent("useDeepCompareEffect");
      } else {
        setChoiceComponent("default");
      }
    }
  }, [slideIndex.h, slideIndex.f, slideOrder]);

  return (
    <section>
      <section>
        <Header>useEffect and useEffectLayout</Header>
        <ul>
          {useEffectAndUseEffectLayout.map((e) => (
            <li className="fragment" key={e.uniqueId}>
              {e.value}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <Header>UseEffect and Objects</Header>
        <CodeDemo structures={structures}>
          <ColorAndCountDemo choiceComponent={choiceComponent} />
        </CodeDemo>
      </section>
    </section>
  );
}
