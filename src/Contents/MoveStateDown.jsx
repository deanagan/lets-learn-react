import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import CodeDemo from "../Common/CodeDemo";
import { Better, Problematic } from "../Demo/MoveStateDownDemo";
import { dedentStrUsing1stLineIndent } from "../Utils/util";

const structures = [
  {
    uniqueId: uuidv4(),
    text: "Move State Down",
    codes: [
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
        isProblematic: true,
        note: "ExpensiveComponent re-renders each time the color is changed when it shouldn't need to.",
        src: dedentStrUsing1stLineIndent(`
              function ExpensiveComponent() {
                const renderCount = useRef(0);
                useEffect(() => {
                  const t = setTimeout(() => console.log("expensive tree!"), 2000);
                  renderCount.current += 1;
                  return () => clearTimeout(t);
                });
                const totalRender = renderCount.current;
                return <p>I am a very slow component, rendered {totalRender} times!.</p>;
              }

              export default function Problematic() {
                const [color, setColor] = useState("red");
                return (
                  <div>
                      <input value={color} onChange={(e) => setColor(e.target.value)} />
                      <p style={{ color }}>Hello, world!</p>
                      <ExpensiveComponent />
                  </div>
                );
              }`),
      },
      {
        uniqueId: uuidv4(),
        lineNumbers: "13,16,17",
        isProblematic: true,
        note: "These items can be moved down",
        src: dedentStrUsing1stLineIndent(`
              function ExpensiveComponent() {
                const renderCount = useRef(0);
                useEffect(() => {
                  const t = setTimeout(() => console.log("expensive tree!"), 2000);
                  renderCount.current += 1;
                  return () => clearTimeout(t);
                });
                const totalRender = renderCount.current;
                return <p>I am a very slow component, rendered {totalRender} times!.</p>;
              }

              export default function Problematic() {
                const [color, setColor] = useState("red");
                return (
                  <div>
                      <input value={color} onChange={(e) => setColor(e.target.value)} />
                      <p style={{ color }}>Hello, world!</p>
                      <ExpensiveComponent />
                  </div>
                );
              }`),
      },
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
        isProblematic: false,
        note: "Shifting to the function component MovedStateDown, fixes the problem.",
        src: dedentStrUsing1stLineIndent(`
              function MovedStateDown() {
                const [color, setColor] = useState("red");
                return (
                    <>
                      <input value={color} onChange={(e) => setColor(e.target.value)} />
                      <p style={{ color }}>Hello, world!</p>
                    </>
                );
              }

              export default function Better() {
                return (
                  <div>
                    <MovedStateDown />
                    <ExpensiveComponent />
                  </div>
                );
              }`),
      },
    ],
    codeSandBoxLink:
      "https://codesandbox.io/s/move-state-down-pogbq?file=/src/Better.js",
  },
];

export default function MoveStateDown({
  slideNumber,
  fragmentNumber,
  slideOrder,
}) {
  const [isBetterComponent, setIsBetterComponent] = useState(false);

  useEffect(() => {
    if (slideNumber.h === slideOrder) {
      setIsBetterComponent(fragmentNumber === 1);
    }
  }, [slideNumber, fragmentNumber, slideOrder]);

  return (
    <section>
      <h4>Code structure - our plan A to improve performance</h4>
      <CodeDemo structures={structures}>
        <div>{isBetterComponent ? <Better /> : <Problematic />}</div>
      </CodeDemo>
    </section>
  );
}
