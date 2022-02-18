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
import UseEffectAndUseLayoutEffect from "./Contents/UseEffectAndUseLayoutEffect";
import UseMemoAndUseCallback from "./Contents/UseMemoAndUseCallback";

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
          <UseEffectAndUseLayoutEffect slideIndex={slideIndex} slideOrder={7} />
          <UseMemoAndUseCallback slideIndex={slideIndex} slideOrder={8} />
        </div>
      </div>
    </div>
  );
}

export default App;
