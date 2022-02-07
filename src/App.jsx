import "./App.css";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/beige.css";
import "reveal.js/plugin/highlight/monokai.css";

import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "reveal.js";
import RevealHighlight from "reveal.js/plugin/highlight/highlight";

import LiftContentUp from "./Contents/LiftContentUp";
import MemoHOC from "./Contents/MemoHOC";
import CustomMemoHOC from "./Contents/MemoHOCCustomCompare";
import MoveStateDown from "./Contents/MoveStateDown";
import ReactPhases from "./Contents/ReactPhases";
import TableOfContents from "./Contents/TableOfContents";

const code = `
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
`;

function App() {
  const [fragmentNo, setFragmentNo] = useState(0);
  const [slideNo, setSlideNo] = useState({ h: 0, v: 0 });
  const [isRevealReady, setIsRevealReady] = useState(false);
  const revealRef = useRef();
  useEffect(() => {
    const deck = new Reveal(document.querySelector(".deck"), {
      embedded: true,
      keyboardCondition: "focused",
    });

    deck.initialize({
      hash: true,
      // Learn about plugins: https:/revealjs.com/plugins/
      plugins: [RevealHighlight],
      dependencies: [],
      width: "100%",
      height: "100%",
      pdfSeparateFragments: false,
      pdfMaxPagesPerSlide: 1,
      embedded: false,
      center: true,
      margin: 0,
    });

    revealRef.current = deck;
    setIsRevealReady((r) => !r);
  }, []);

  const slideChangedEventHandler = useCallback((event) => {
    setSlideNo({ h: +event.indexh, v: +event.indexv });
  }, []);

  // eslint-disable-next-line no-unused-vars
  const fragmentShownEventHandler = useCallback((_event) => {
    const { f } = revealRef.current.getIndices();
    setFragmentNo(f);
  }, []);

  useEffect(() => {
    if (isRevealReady) {
      revealRef.current.on("slidechanged", slideChangedEventHandler);
      revealRef.current.on("fragmentshown", fragmentShownEventHandler);
      revealRef.current.on("fragmenthidden", fragmentShownEventHandler);
      const { f, h, v } = revealRef.current.getIndices();
      setFragmentNo(f);
      setSlideNo({ h, v });
    }
  }, [isRevealReady, slideChangedEventHandler, fragmentShownEventHandler]);

  return (
    <div className="App">
      <div className="reveal deck">
        <div className="slides">
          <section>
            <h2 className="title">Operative React</h2>
            <div>
              adjective: <em>/ˈɒp(ə)rətɪv/</em> -{" "}
              <em>
                functioning or having effect. <br />
                <p>Example: the code is operative!</p>
              </em>
            </div>
          </section>
          <TableOfContents />
          <ReactPhases />
          <MoveStateDown
            fragmentNumber={fragmentNo}
            slideNumber={slideNo}
            slideOrder={3}
          />
          <LiftContentUp
            fragmentNumber={fragmentNo}
            slideNumber={slideNo}
            slideOrder={4}
          />
          <MemoHOC
            fragmentNumber={fragmentNo}
            slideNumber={slideNo}
            slideOrder={5}
          />
          <CustomMemoHOC
            fragmentNumber={fragmentNo}
            slideNumber={slideNo}
            slideOrder={6}
          />
          <section>
            <section>
              <h2 className="title">React Learning Coming Soon 1-1!</h2>
            </section>
            <section>
              <h2 className="title">React Learning Coming Soon 1-2!</h2>
            </section>
          </section>
          <section>
            <section>
              <h2 className="title">React Learning Coming Soon 2-1!</h2>
            </section>
            <section>
              <h2 className="title">React Learning Coming Soon 2-2!</h2>
            </section>
          </section>
          <section>
            <pre className="prettyprint" style={{ fontSize: "0.35em" }}>
              <code className="javascript" data-trim data-line-numbers="2,6">
                {code}
              </code>
            </pre>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
