import { useCallback, useEffect, useRef, useState } from "react";

import PrimaryColors from "./PrimaryColors";

const favoriteColors = ["red", "green", "blue"];

const useWindowEvent = (event, callback) => {
  useEffect(() => {
    console.log("Adding event listener");
    window.addEventListener(event, callback);
    return () => window.removeEventListener(event, callback);
  }, [event, callback]);
};

const useWindowEventWithDeps = (event, callback, dependencies) => {
  useEffect(() => {
    console.log("Adding event listener with deps");
    window.addEventListener(event, callback);
    return () => window.removeEventListener(event, callback);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event, callback, ...dependencies]);
};

const useWindowResizeEventHandlerWithDeps = (callback, dependencies = []) => {
  return useWindowEventWithDeps("resize", callback, dependencies);
};

const useWindowResizeEventHandler = (callback) =>
  useWindowEvent("resize", callback);

function WindowEventHookDemoEventHandler({ count }) {
  const resizeEventHandler = useCallback(
    (m1) => {
      console.log(
        `Resize happened! width: ${m1.target.innerWidth} height: ${m1.target.innerHeight} Count: ${count}`
      );
    },
    [count]
  );

  const resizeEventHandlerNoCallback = (m1) => {
    console.log(
      `Resize happened! width: ${m1.target.innerWidth} height: ${m1.target.innerHeight} Count: ${count}`
    );
  };

  useWindowResizeEventHandler(resizeEventHandler);
  useWindowResizeEventHandlerWithDeps(resizeEventHandlerNoCallback, [count]);

  return <h4>Watcher {count}</h4>;
}

function UseWindowEventHookDemoWrapped() {
  const [count, setCount] = useState(0);

  const incrementCount = useCallback(() => {
    setCount((cc) => cc + 1);
  }, []);

  return (
    <div>
      <div>Current Count {count}</div>
      <button onClick={incrementCount}>Increment Count</button>

      <PrimaryColors colors={favoriteColors} />
      <WindowEventHookDemoEventHandler count={count} />
    </div>
  );
}

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

export const UseWindowEventHookDemo = (props) => {
  useWhyDidYouUpdate("UseWindowEventHookDemoCheck", props);
  return <UseWindowEventHookDemoWrapped {...props} />;
};
