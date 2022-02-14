import { useLayoutEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import CodeDemo from "../Common/CodeDemo";
// eslint-disable-next-line no-unused-vars
import {
  //Better,
  Better2,
  //Better3,
  Problematic,
} from "../Demo/LiftContentUpDemo";
import { dedentStrUsing1stLineIndent } from "../Utils/util";

const structures = [
  {
    uniqueId: uuidv4(),
    text: "Lift Content Up",
    codes: [
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
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
                  <div style={{ color }}>
                    <input value={color} onChange={(e) => setColor(e.target.value)} />
                    <p>Hello, world!</p>
                    <ExpensiveComponent />
                  </div>
                );
              }`),
      },
      {
        uniqueId: uuidv4(),
        lineNumbers: "13,15,16",
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
                  <div style={{ color }}>
                    <input value={color} onChange={(e) => setColor(e.target.value)} />
                    <p>Hello, world!</p>
                    <ExpensiveComponent />
                  </div>
                );
              }`),
      },
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
        src: dedentStrUsing1stLineIndent(`
              function LiftContentUp({ children }) {
                const [color, setColor] = useState("red");
                return (
                  <div style={{ color }}>
                    <input value={color} onChange={(e) => setColor(e.target.value)} />
                    {children}
                  </div>
                );
              }

              export default function Better() {
                return (
                  <LiftContentUp>
                    <p>Hello, world!</p>
                    <ExpensiveComponent />
                  </LiftContentUp>
                );
              }
              `),
      },
    ],
    codeSandBoxLink:
      "https://codesandbox.io/s/lift-up-content-qgyyn?file=/src/Better.jsx:664-813",
  },
];

export default function LiftContentUp({ slideIndex, slideOrder }) {
  const [isBetterComponent, setIsBetterComponent] = useState(false);

  useLayoutEffect(() => {
    if (slideIndex.h === slideOrder) {
      setIsBetterComponent(slideIndex.f === 1);
    }
  }, [slideIndex.h, slideIndex.f, slideOrder]);

  return (
    <section>
      <h4>Code structure - our plan A to improve performance</h4>
      <CodeDemo structures={structures}>
        <div>{isBetterComponent ? <Better2 /> : <Problematic />}</div>
      </CodeDemo>
    </section>
  );
}
