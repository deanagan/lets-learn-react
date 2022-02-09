import { uuid } from "uuidv4";

// import { dedentStrUsing1stLineIndent } from "../Utils/util";

const useEffectAndUseEffectLayout = [
  {
    uniqueId: uuid(),
    value:
      "The Effect Hook lets you perform side effects in function components",
  },
  {
    uniqueId: uuid(),
    value:
      "Is equivalent to componentDidMount, componentDidUpdate, and componentWillUnmount combined from class based components",
  },
  {
    uniqueId: uuid(),
    value:
      "useEffect hooks are executed after render, when DOM updates have been done",
  },
  {
    uniqueId: uuid(),
    value:
      "useEffect is designed to handle one concern, so it is best to use multiple useEffect to separate concerns",
  },
  {
    uniqueId: uuid(),
    value:
      "useEffect runs both after the first render (regardless of dependency) and after every update",
  },
  {
    uniqueId: uuid(),
    value:
      "Because useEffect runs when its dependencies change, care must be take to consider Javascript's referential equality rules to avoid infinite loops",
  },
];

// const structures = [
//   {
//     uniqueId: uuidv4(),
//     text: "Lift Content Up",
//     codes: [
//       {
//         uniqueId: uuidv4(),
//         lineNumbers: "",
//         src: dedentStrUsing1stLineIndent(`
//               function ExpensiveComponent() {
//                 const renderCount = useRef(0);
//                 useEffect(() => {
//                   const t = setTimeout(() => console.log("expensive tree!"), 2000);
//                   renderCount.current += 1;
//                   return () => clearTimeout(t);
//                 });
//                 const totalRender = renderCount.current;
//                 return <p>I am a very slow component, rendered {totalRender} times!.</p>;
//               }

//               export default function Problematic() {
//                 const [color, setColor] = useState("red");
//                 return (
//                   <div style={{ color }}>
//                     <input value={color} onChange={(e) => setColor(e.target.value)} />
//                     <p>Hello, world!</p>
//                     <ExpensiveComponent />
//                   </div>
//                 );
//               }`),
//       },
//       {
//         uniqueId: uuidv4(),
//         lineNumbers: "13,15,16",
//         src: dedentStrUsing1stLineIndent(`
//               function ExpensiveComponent() {
//                 const renderCount = useRef(0);
//                 useEffect(() => {
//                   const t = setTimeout(() => console.log("expensive tree!"), 2000);
//                   renderCount.current += 1;
//                   return () => clearTimeout(t);
//                 });
//                 const totalRender = renderCount.current;
//                 return <p>I am a very slow component, rendered {totalRender} times!.</p>;
//               }

//               export default function Problematic() {
//                 const [color, setColor] = useState("red");
//                 return (
//                   <div style={{ color }}>
//                     <input value={color} onChange={(e) => setColor(e.target.value)} />
//                     <p>Hello, world!</p>
//                     <ExpensiveComponent />
//                   </div>
//                 );
//               }`),
//       },
//       {
//         uniqueId: uuidv4(),
//         lineNumbers: "",
//         src: dedentStrUsing1stLineIndent(`
//               function LiftContentUp({ children }) {
//                 const [color, setColor] = useState("red");
//                 return (
//                   <div style={{ color }}>
//                     <input value={color} onChange={(e) => setColor(e.target.value)} />
//                     {children}
//                   </div>
//                 );
//               }

//               export default function Better() {
//                 return (
//                   <LiftContentUp>
//                     <p>Hello, world!</p>
//                     <ExpensiveComponent />
//                   </LiftContentUp>
//                 );
//               }
//               `),
//       },
//     ],
//     codeSandBoxLink:
//       "https://codesandbox.io/s/lift-up-content-qgyyn?file=/src/Better.jsx:664-813",
//   },
// ];

export default function UseEffectAndUseEffectLayout({
  // eslint-disable-next-line no-unused-vars
  slideIndex,
  // eslint-disable-next-line no-unused-vars
  slideOrder,
}) {
  // const [isBetterComponent, setIsBetterComponent] = useState(false);

  // useLayoutEffect(() => {
  //   if (slideIndex.h === slideOrder) {
  //     setIsBetterComponent(slideIndex.f === 1);
  //   }
  // }, [slideIndex.h, slideIndex.f, slideOrder]);

  return (
    <section>
      <section>
        <h3>React.memo</h3>
        <ul>
          {useEffectAndUseEffectLayout.map((e) => (
            <li className="fragment" key={e.uniqueId}>
              {e.value}
            </li>
          ))}
        </ul>
      </section>

      {/* <section>
        <h4>Code structure - our plan A to improve performance</h4>
        <CodeDemo structures={structures}>
          <div>{isBetterComponent ? <Better /> : <Problematic />}</div>
        </CodeDemo>
      </section> */}
    </section>
  );
}
