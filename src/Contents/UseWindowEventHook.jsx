import { useLayoutEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import CodeDemo from "../Common/CodeDemo";
import { UseWindowEventHookDemo } from "../Demo/UseWindowEventHookDemo";
import { dedentStrUsing1stLineIndent } from "../Utils/util";

const structures = [
  {
    uniqueId: uuidv4(),
    sandboxlink:
      "https://codesandbox.io/s/usememo-and-usecallback-qvehl?file=/src/App.js",
    gitlink:
      "https://github.com/deanagan/react-snippets/tree/main/usememo-color",

    lineNumbers: "",
    description:
      "ColorAppV1 is a component that has number increment, and color changing buttons and drop down form. Observe PrimaryColors always re-rendering anytime the app's local state changes. ",
    codes: [
      {
        uniqueId: uuidv4(),
        lineNumbers: "",
        src: dedentStrUsing1stLineIndent(`
          function useWhyDidYouUpdate(name, props) {
            const previousProps = useRef();
            const updateCount = useRef(0);
            useEffect(() => {
              if (previousProps.current) {
                // Get all keys from previous and current props
                const allKeys = Object.keys({ ...previousProps.current, ...props });
                // Use this object to keep track of changed props
                const changesObj = {};
                // Iterate through keys
                allKeys.forEach((key) => {
                  // If previous is different from current
                  if (previousProps.current[key] !== props[key]) {
                    // Add to changesObj
                    changesObj[key] = {
                      from: previousProps.current[key],
                      to: props[key],
                    };
                  }
                });
                // If changesObj is not empty then output to console
                if (Object.keys(changesObj).length) {
                  console.log("[why-did-it-update]", name, changesObj);
                  updateCount.current += 1;
                  console.log("Update Count: ", updateCount.current);
                }
              }
              // Finally update previousProps with current props for next hook call
              previousProps.current = props;
            });
          }

          // Wrap component to check
          const ColorDropDownUnderCheck = (props) => {
            useWhyDidYouUpdate("ColorDropDown", props);
            return <ColorDropDown {...props} />;
          };
          `),
      },
    ],
  },
];

export default function UsingWindowEventHook({ slideIndex, slideOrder }) {
  const [showComponent, setShowComponent] = useState(false);

  useLayoutEffect(() => {
    if (slideIndex.h === slideOrder) {
      setShowComponent(true);
    } else {
      setShowComponent(false);
    }
  }, [slideIndex.h, slideOrder]);

  return (
    <section>
      <h4>Window Event Hooks</h4>
      <CodeDemo structures={structures}>
        {showComponent ? <UseWindowEventHookDemo /> : null}
      </CodeDemo>
    </section>
  );
}
