import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Label = styled.label`
  display: block;
`;

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

function Greeter() {
  const [name, setName] = useState("");
  const runCount = useRef(0);
  const totalCount = runCount.current;

  useEffect(() => {
    runCount.current += 1;
  });

  return (
    <>
      <p>RunCount {totalCount}</p>
      <Label htmlFor="name">Name</Label>
      <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
      <p>Hello, {name || "stranger"}!</p>
    </>
  );
}

function LiftContentUp2({ children, initColor }) {
  const [color, setColor] = useState(initColor);
  return (
    <div style={{ color }}>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      {children}
    </div>
  );
}

export function Better2() {
  // We had to add a greeter component and add an initial color for lift content up
  return (
    <LiftContentUp2 initColor={"blue"}>
      <Greeter />
      <ExpensiveComponent />
    </LiftContentUp2>
  );
}

// export function Better3() {
//   return (
//     <SubBetter3>
//       <input value={name} onChange={(e) => setName(e.target.value)} />
//       <p>Hello, {name || "stranger"}!</p>
//       <ExpensiveComponent />
//     </SubBetter3>
//   );
// }

// function SubBetter3() {
//   // Ahhh. We had to greet someone of course!

//   return (
//     <LiftContentUp>
//       <input value={name} onChange={(e) => setName(e.target.value)} />
//       <p>Hello, {name || "stranger"}!</p>
//       <ExpensiveComponent />
//     </LiftContentUp>
//   );
// }
