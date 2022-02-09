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
import UseEffectAndUseEffectLayout from "./Contents/UseEffectAndUseEffectLayout";

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
  const [slideIndex, setSlideIndex] = useState({ h: 0, v: 0, f: 0 });
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

  // eslint-disable-next-line no-unused-vars
  const slideChangedEventHandler = useCallback((_event) => {
    const { f, h, v } = revealRef.current.getIndices();
    setSlideIndex({ f, h, v });
  }, []);

  useEffect(() => {
    if (isRevealReady) {
      revealRef.current.on("slidechanged", slideChangedEventHandler);
      revealRef.current.on("fragmentshown", slideChangedEventHandler);
      revealRef.current.on("fragmenthidden", slideChangedEventHandler);
      const { f, h, v } = revealRef.current.getIndices();
      setSlideIndex({ f, h, v });
    }
  }, [isRevealReady, slideChangedEventHandler]);

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
          <MoveStateDown slideIndex={slideIndex} slideOrder={3} />
          <LiftContentUp slideIndex={slideIndex} slideOrder={4} />
          <MemoHOC slideIndex={slideIndex} slideOrder={5} />
          <CustomMemoHOC slideIndex={slideIndex} slideOrder={6} />
          <UseEffectAndUseEffectLayout slideIndex={slideIndex} slideOrder={7} />
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
