import styled from "styled-components";

function dedentStrUsing1stLineIndent(s) {
  return s;
}

const structures = [
  {
    uniqueId: 1,
    text: "Move State Down",
    codes: [
      {
        uniqueId: 1,
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
                  <div>
                      <input value={color} onChange={(e) => setColor(e.target.value)} />
                      <p style={{ color }}>Hello, world!</p>
                      <ExpensiveComponent />
                  </div>
                );
              }`),
      },
      {
        uniqueId: 2,
        lineNumbers: "13,16,17",
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
        uniqueId: 3,
        lineNumbers: "",
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
  {
    uniqueId: 2,
    text: "Lift Content Up",
    codes: [
      {
        uniqueId: 1,
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
        uniqueId: 2,
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
        uniqueId: 3,
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

const StyledParagraph = styled.p`
  font-size: 0.5em;
`;
const StyledPre = styled.pre`
  font-size: 0.35em;
`;

export default function CodeStructure() {
  const codeData = (codes) =>
    codes.map((code) => (
      <code
        className={code.uniqueId === 0 ? "javascript" : "fragment javascript"}
        data-trim
        data-line-numbers={code.lineNumbers}
      >
        {code.src}
      </code>
    ));

  return (
    <section>
      <h4>Code structure - our plan A to improve performance</h4>
      {structures.map((s) => (
        <section key={s.uniqueId}>
          <StyledParagraph>{s.text}</StyledParagraph>
          <StyledPre className="prettyprint">{codeData(s.codes)}</StyledPre>
          <a href={s.codeSandBoxLink}>See code</a>
        </section>
      ))}
    </section>
  );
}
