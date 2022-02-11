import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const CodeDemo = styled.div`
  z-index: 3;
`;

function ExpensiveComponent() {
  let renderCount = useRef(0);
  useEffect(() => {
    const t = setTimeout(() => console.log("expensive tree!"), 2000);
    renderCount.current += 1;
    return () => clearTimeout(t);
  });
  const totalRender = renderCount.current;
  return <p>I am a very slow component, rendered {totalRender} times.</p>;
}

function MovedStateDown() {
  const [color, setColor] = useState("red");
  return (
    <>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      <p style={{ color }}>Hello, world!</p>
    </>
  );
}

export function Better() {
  return (
    <div>
      <MovedStateDown />
      <ExpensiveComponent />
    </div>
  );
}

export function Problematic() {
  const [color, setColor] = useState("red");
  return (
    <CodeDemo>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      <p style={{ color }}>Hello, world!</p>
      <ExpensiveComponent />
    </CodeDemo>
  );
}
