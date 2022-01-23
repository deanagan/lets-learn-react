import { useEffect, useRef } from "react";
import "./App.css";
import Reveal from "reveal.js";
import RevealHighlight from 'reveal.js/plugin/highlight/highlight';
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/beige.css";
import "reveal.js/plugin/highlight/monokai.css";
import Remember from "./Contents/Remember";


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
`

function App() {
  const revealRef = useRef();
  useEffect(() => {

    const deck = new Reveal(document.querySelector(".deck"), {
      embedded: true,
      keyboardCondition: "focused",
    })
    deck.initialize({
      hash: true,
      // Learn about plugins: https:/revealjs.com/plugins/
      plugins: [RevealHighlight],
      dependencies: [],
      width: 960,
      height: 700,
      pdfSeparateFragments: false,
      pdfMaxPagesPerSlide: 1,
      embedded: false,
      center: true,
    })
    revealRef.current = deck
  }, []);

  return (
    <div className="App">
      <div className="reveal deck">
        <div className="slides">
          <section>
            <h2 className="title">Let's Learn React!</h2>
          </section>
          <Remember />
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
            <pre className="prettyprint" style={{fontSize: "0.35em"}}>
              <code className="javascript" data-trim data-line-numbers="2,6">{ code }</code>
            </pre>
          </section>

        </div>
      </div>
    </div>
  );
}

export default App;
