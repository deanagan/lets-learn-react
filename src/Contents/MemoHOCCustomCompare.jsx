import { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import CodeDemo from "../Common/CodeDemo";
import CustomMemoApp from "../Demo/CustomMemoCompCounter";
import { dedentStrUsing1stLineIndent } from "../Utils/util";

const customMemo = [
  {
    uniqueId: uuidv4(),
    text: "Using custom compare in React.memo",
    codes: [
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
        src: dedentStrUsing1stLineIndent(`
        export default function CustomMemoApp() {
          const [ball, setBall] = useState({ color: "blue", weight: 0 });
          const setBallToColor = (color) => setBall((pb) => ({ ...pb, color }));
          const incrementWeight = () =>
            setBall((pb) => ({ ...pb, weight: pb.weight + 1 }));

          return (
            <div className="App">
              <h2>Custom Memo</h2>
              <Button buttonColor={ball.color} onClick={incrementWeight}>
                Increment Weight
              </Button>
              <Button onClick={() => setBallToColor("red")}>Red</Button>
              <Button onClick={() => setBallToColor("green")}>Green</Button>
              <Button onClick={() => setBallToColor("blue")}>Blue</Button>
              <BallInfo ball={ball} />
            </div>
          );
        }

        function BallInfoToMemo({ ball }) {
          const renderCountRef = useRef(0);
          const renderCount = renderCountRef.current;

          useEffect(() => (renderCountRef.current += 1));

          return (
            <div>
              <h4>Render count: {renderCount} time(s)</h4>
              <p>
                Color:{ball.color}, Weight:{ball.weight}
              </p>
            </div>
          );
        }

        const BallInfo = memo(BallInfoToMemo);
        `),
      },

      {
        uniqueId: uuidv4(),
        lineNumbers: "16,37",
        src: dedentStrUsing1stLineIndent(`
        export default function CustomMemoApp() {
          const [ball, setBall] = useState({ color: "blue", weight: 0 });
          const setBallToColor = (color) => setBall((pb) => ({ ...pb, color }));
          const incrementWeight = () =>
            setBall((pb) => ({ ...pb, weight: pb.weight + 1 }));

          return (
            <div className="App">
              <h2>Custom Memo</h2>
              <Button buttonColor={ball.color} onClick={incrementWeight}>
                Increment Weight
              </Button>
              <Button onClick={() => setBallToColor("red")}>Red</Button>
              <Button onClick={() => setBallToColor("green")}>Green</Button>
              <Button onClick={() => setBallToColor("blue")}>Blue</Button>
              <BallInfo ball={ball} />
            </div>
          );
        }

        function BallInfoToMemo({ ball }) {
          const renderCountRef = useRef(0);
          const renderCount = renderCountRef.current;

          useEffect(() => (renderCountRef.current += 1));

          return (
            <div>
              <h4>Render count: {renderCount} time(s)</h4>
              <p>
                Color:{ball.color}, Weight:{ball.weight}
              </p>
            </div>
          );
        }

        const BallInfo = memo(BallInfoToMemo);
        `),
      },

      {
        uniqueId: uuidv4(),
        lineNumbers: "16,37-38",
        src: dedentStrUsing1stLineIndent(`
        export default function CustomMemoApp() {
          const [ball, setBall] = useState({ color: "blue", weight: 0 });
          const setBallToColor = (color) => setBall((pb) => ({ ...pb, color }));
          const incrementWeight = () =>
            setBall((pb) => ({ ...pb, weight: pb.weight + 1 }));

          return (
            <div className="App">
              <h2>Custom Memo</h2>
              <Button buttonColor={ball.color} onClick={incrementWeight}>
                Increment Weight
              </Button>
              <Button onClick={() => setBallToColor("red")}>Red</Button>
              <Button onClick={() => setBallToColor("green")}>Green</Button>
              <Button onClick={() => setBallToColor("blue")}>Blue</Button>
              <MemoizedBallInfo ball={ball} />
            </div>
          );
        }

        function BallInfoToMemo({ ball }) {
          const renderCountRef = useRef(0);
          const renderCount = renderCountRef.current;

          useEffect(() => (renderCountRef.current += 1));

          return (
            <div>
              <h4>Render count: {renderCount} time(s)</h4>
              <p>
                Color:{ball.color}, Weight:{ball.weight}
              </p>
            </div>
          );
        }

        // Using lodash's isEqual function
        const MemoizedBallInfo = memo(BallInfoToMemo, isEqual);
        `),
      },

      {
        uniqueId: uuidv4(),
        lineNumbers: "16,36-39",
        src: dedentStrUsing1stLineIndent(`
        export default function CustomMemoApp() {
          const [ball, setBall] = useState({ color: "blue", weight: 0 });
          const setBallToColor = (color) => setBall((pb) => ({ ...pb, color }));
          const incrementWeight = () =>
            setBall((pb) => ({ ...pb, weight: pb.weight + 1 }));

          return (
            <div className="App">
              <h2>Custom Memo</h2>
              <Button buttonColor={ball.color} onClick={incrementWeight}>
                Increment Weight
              </Button>
              <Button onClick={() => setBallToColor("red")}>Red</Button>
              <Button onClick={() => setBallToColor("green")}>Green</Button>
              <Button onClick={() => setBallToColor("blue")}>Blue</Button>
              <MemoizedBallInfo ball={ball} />
            </div>
          );
        }

        function BallInfoToMemo({ ball }) {
          const renderCountRef = useRef(0);
          const renderCount = renderCountRef.current;

          useEffect(() => (renderCountRef.current += 1));

          return (
            <div>
              <h4>Render count: {renderCount} time(s)</h4>
              <p>
                Color:{ball.color}, Weight:{ball.weight}
              </p>
            </div>
          );
        }
        // or
        const MemoizedBallInfo = memo(BallInfoToMemo, (prop1, prop2) => {
          return prop1.weight === prop2.weight && prop1.color === prop2.color;
        });
        `),
      },
    ],
  },
];

const Header = styled.h3`
  margin-top: 300px;
`;

export default function CustomMemoHOC({ slideIndex, slideOrder }) {
  const [usesCustomMemo, setUsesCustomMemo] = useState(false);

  useEffect(() => {
    if (slideIndex.h === slideOrder) {
      setUsesCustomMemo(slideIndex.f > 0);
    }
  }, [slideIndex.h, slideIndex.f, slideOrder]);

  return (
    <section>
      <section>
        <Header>Custom Memo App</Header>
        <CodeDemo structures={customMemo}>
          <CustomMemoApp usesCustomMemo={usesCustomMemo} />
        </CodeDemo>
      </section>
    </section>
  );
}
