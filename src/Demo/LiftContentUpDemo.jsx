import { useEffect, useRef, useState } from "react";

function ExpensiveComponent() {
  let renderCount = useRef(0);
  useEffect(() => {
    const t = setTimeout(() => console.log("expensive tree!"), 2000);
    renderCount.current += 1;
    return () => clearTimeout(t);
  });
  const totalRender = renderCount.current;
  return <p>I am a very slow component, rendered {totalRender} times!.</p>;
}

function LiftContentUp({ children }) {
  const [color, setColor] = useState("red");
  return (
    <div style={{ color }}>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      {children}
    </div>
  );
}

export function Problematic() {
  const [color, setColor] = useState("red");
  return (
    <div style={{ color }}>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      <p>Hello, world!</p>
      <ExpensiveComponent />
    </div>
  );
}

export function Better() {
  return (
    <LiftContentUp>
      <p>Hello, world!</p>
      <ExpensiveComponent />
    </LiftContentUp>
  );
}
