import { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import CodeDemo from "../Common/CodeDemo";
import { Better, Better2, Problematic } from "../Demo/LiftContentUpDemo";
import { dedentStrUsing1stLineIndent } from "../Utils/util";

const Comment = styled.p`
  font-size: 1.5rem;
`;

const BorderedApp = styled.div`
  border-style: solid;
  margin-right: 20px;
`;

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
      {
        comment:
          "Lift component up to a parent, then pass the expensive component down as a prop",
        uniqueId: uuidv4(),
        lineNumbers: "",
        src: dedentStrUsing1stLineIndent(`
          export function Better2() {
            return (
              <ExpensiveComponentWrapper expensiveComponent={<ExpensiveComponent />} />
            );
          }

          function ExpensiveComponentWrapper(props) {
            const [color, setColor] = useState("red");
            return (
              <div style={{ color }}>
                <input value={color} onChange={(e) => setColor(e.target.value)} />
                <p>Hello, world!</p>
                {props.expensiveComponent}
              </div>
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
  const [isBetterComponent, setIsBetterComponent] = useState("");
  const [comment, setComment] = useState("");

  useLayoutEffect(() => {
    if (slideIndex.h === slideOrder) {
      if (slideIndex.f === 1) {
        setIsBetterComponent("better1");
      } else if (slideIndex.f === 2) {
        setIsBetterComponent("better2");
      } else {
        setIsBetterComponent("");
      }
      const [{ codes }] = structures;
      if (codes?.length) {
        setComment(codes[slideIndex.f + 1].comment ?? "");
      }
    }
  }, [slideIndex.h, slideIndex.f, slideOrder]);

  return (
    <section>
      <h4>Code structure - our plan A to improve performance</h4>
      <CodeDemo structures={structures}>
        <BorderedApp>
          {isBetterComponent === "better1" ? (
            <Better />
          ) : isBetterComponent === "better2" ? (
            <Better2 />
          ) : (
            <Problematic />
          )}
          <hr />
          <Comment>{comment}</Comment>
        </BorderedApp>
      </CodeDemo>
    </section>
  );
}
