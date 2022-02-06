import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const phases = [
  {
    uniqueId: uuidv4(),
    drawing: `graph LR;
       render-->reconciliation;
       reconciliation-->commit;
       commit-->state[state change];
       state[state change]-->render;
       style render fill:#00FFFF,stroke:#333,stroke-width:4px
       style state fill:#FFF,stroke:#333,stroke-width:0px
      `,
    text: "Create JSX Elements to form virtual DOM",
    vdomData: `flowchart LR;
        id1((div));
        id2((btn));
        id3((span));
        id1-->id2;
        id1-->id3;
      `,
    actualDomData: `flowchart LR;
        id1((div));
        id2((btn));
        id3((span));
        id1-->id2;
        id1-->id3;
      `,
  },
  {
    uniqueId: uuidv4(),
    drawing: `graph LR;
       render-->reconciliation;
       reconciliation-->commit;
       commit-->state[state change];
       state[state change]-->render;
       style reconciliation fill:#00FFFF,stroke:#333,stroke-width:4px
       style state fill:#FFF,stroke:#333,stroke-width:0px
      `,
    text: "Compare nodes between virtual DOM and actual browser DOM",
    vdomData: `flowchart LR;
        id1((div));
        id2((btn));
        id3((span));
        id4((btn));
        id1-->id2;
        id1-->id3;
        id1-->id4;
        style id4 fill:#FFD700,stroke:#333,stroke-width:0px
      `,
    actualDomData: `flowchart LR;
        id1((div));
        id2((btn));
        id3((span));
        id1-->id2;
        id1-->id3;
      `,
  },
  {
    uniqueId: uuidv4(),
    drawing: `graph LR;
       render-->reconciliation;
       reconciliation-->commit;
       commit-->state[state change];
       state[state change]-->render;
       style commit fill:#00FFFF,stroke:#333,stroke-width:4px
       style state fill:#FFF,stroke:#333,stroke-width:0px
      `,
    text: "Update the actual DOM if needed",
    vdomData: `flowchart LR;
        id1((div));
        id2((btn));
        id3((span));
        id4((btn));
        id1-->id2;
        id1-->id3;
        id1-->id4;
        style id4 fill:#FFD700,stroke:#333,stroke-width:0px
      `,
    actualDomData: `flowchart LR;
        id1((div));
        id2((btn));
        id3((span));
        id4((btn));
        id1-->id2;
        id1-->id3;
        id1-->id4;
        style id4 fill:#FFD700,stroke:#333,stroke-width:0px
      `,
  },
];

export default function ReactPhases() {
  useEffect(() => {
    import("mermaid/dist/mermaid").then((m) => {
      m.initialize({
        startOnLoad: true,
      });
      m.init();
    });
  });

  return (
    <section className="phases">
      <h3>React Render Phases</h3>
      {phases.map((phase) => (
        <section key={phase.uniqueId} data-transition="none">
          <div className="mermaid">{phase.drawing}</div>
          <p>{phase.text}</p>
          <table className="domCompare">
            <tbody>
              <tr>
                <td>
                  <p>Virtual DOM</p>
                  <div className="mermaid">{phase.vdomData}</div>
                </td>
                <td> </td>
                <td>
                  <p>Actual DOM</p>
                  <div className="mermaid">{phase.actualDomData}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      ))}
    </section>
  );
}
