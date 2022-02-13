import { isEqual } from "lodash";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  margin: 5px;
  color: ${(props) => props.buttonColor};
`;

const Controls = styled.div`
  position: relative;
`;

const ColorInfo = styled.div`
  width: 450px;
`;

const colorChoices = [
  { uniqueId: 1, name: "red" },
  { uniqueId: 2, name: "green" },
  { uniqueId: 3, name: "blue" },
];

export default function ColorAndCountDemo({ choiceComponent = "default" }) {
  const [colorAndCount, setColorAndCount] = useState(() => ({
    count: 0,
    color: colorChoices.find((c) => c.name === "blue"),
  }));
  const [component, setComponent] = useState(
    <ColorAndCountComponent colorAndCount={colorAndCount} />
  );

  const setColor = (color) => {
    setColorAndCount((ccc) => ({
      count: ccc.count,
      color: colorChoices.find((c) => c.name === color),
    }));
  };

  const incrementCount = () => {
    setColorAndCount((ccc) => ({ count: ccc.count + 1, color: ccc.color }));
  };

  useLayoutEffect(() => {
    setComponent(
      choiceComponent === "useMemoCompare" ? (
        <ColorAndCountComponentWithMemo colorAndCount={colorAndCount} />
      ) : choiceComponent === "useDeepCompareEffect" ? (
        <ColorAndCountComponentWithUseDeepEffect
          colorAndCount={colorAndCount}
        />
      ) : choiceComponent === "useNoLayoutEffect" ? (
        <ColorAndCountComponentWithUseDeepEffectAndWithoutUseLayoutEffect
          colorAndCount={colorAndCount}
        />
      ) : choiceComponent === "useLayoutEffect" ? (
        <ColorAndCountComponentWithUseDeepEffectAndUseLayoutEffect
          colorAndCount={colorAndCount}
        />
      ) : (
        <ColorAndCountComponent colorAndCount={colorAndCount} />
      )
    );
  }, [choiceComponent, colorAndCount]);

  return (
    <div>
      <Controls>
        <Button onClick={incrementCount}>Increment</Button>
        <Button onClick={() => setColor("red")}>Red</Button>
        <Button onClick={() => setColor("green")}>Green</Button>
        <Button onClick={() => setColor("blue")}>Blue</Button>
      </Controls>
      <>{component}</>
    </div>
  );
}

function ColorAndCountComponent({ colorAndCount }) {
  const [color, setColor] = useState("");
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount((c) => c + 1);
    if (colorAndCount) {
      const { count, color } = colorAndCount;
      setCount(count);
      setColor(color.name);
    }
  }, [colorAndCount]);

  return (
    <>
      <div>UseEffect Run Count {renderCount}</div>
      <ColorInfo style={{ color }}>
        Color: {color} Count: {count}
      </ColorInfo>
    </>
  );
}

const useMemoObjCompare = (value) => {
  const prevRef = useRef();
  const previous = prevRef.current;
  const isObjEqual = isEqual(previous, value);
  useEffect(() => {
    if (!isObjEqual) {
      prevRef.current = value;
    }
  });
  return isObjEqual ? previous : value;
};

export function ColorAndCountComponentWithMemo({ colorAndCount }) {
  const [color, setColor] = useState("");
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);
  const colorAndCountMemo = useMemoObjCompare(colorAndCount);

  useEffect(() => {
    setRenderCount((c) => c + 1);
    if (colorAndCountMemo) {
      const { count, color } = colorAndCountMemo;
      setCount(count);
      setColor(color.name);
    }
  }, [colorAndCountMemo]);

  return (
    <>
      <div>UseEffect Run Count {renderCount}</div>
      <ColorInfo style={{ color }}>
        Color: {color} Count: {count}
      </ColorInfo>
    </>
  );
}

function useDeepCompareMemoize(value) {
  const ref = useRef(value);
  const changeTrigger = useRef(0);

  if (!isEqual(value, ref.current)) {
    ref.current = value;
    changeTrigger.current += 1;
  }
  // disable exhaustive hooks for this because we want the
  // memoization to trigger from the increment
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => ref.current, [changeTrigger.current]);
}

function isPrimitive(value) {
  return value !== Object(value);
}

function useDeepCompareEffect(callback, dependencies) {
  if (!dependencies || !dependencies.length) {
    throw "Invalid dependencies.";
  }

  if (dependencies.every(isPrimitive)) {
    throw "All dependencies are primitive. Just use useEffect.";
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(callback, useDeepCompareMemoize(dependencies));
}

export function ColorAndCountComponentWithUseDeepEffect({ colorAndCount }) {
  const [color, setColor] = useState("");
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  useDeepCompareEffect(() => {
    setRenderCount((c) => c + 1);
    if (colorAndCount) {
      const { count, color } = colorAndCount;
      setCount(count);
      setColor(color.name);
    }
  }, [colorAndCount]);

  return (
    <>
      <div>UseEffect Run Count {renderCount}</div>
      <ColorInfo style={{ color }}>
        Color: {color} Count: {count}
      </ColorInfo>
    </>
  );
}

export function ColorAndCountComponentWithUseDeepEffectAndWithoutUseLayoutEffect({
  colorAndCount,
}) {
  const [color, setColor] = useState("");
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  useDeepCompareEffect(() => {
    setRenderCount((c) => c + 1);
    if (colorAndCount) {
      const { count, color } = colorAndCount;
      setCount(count);
      setColor(color.name);
    }
  }, [colorAndCount]);

  return (
    <>
      <div>UseEffect Run Count {renderCount}</div>
      <ColorInfo style={{ color }}>
        Color: {color} Count: {count}
      </ColorInfo>
    </>
  );
}

export function ColorAndCountComponentWithUseDeepEffectAndUseLayoutEffect({
  colorAndCount,
}) {
  const [color, setColor] = useState("");
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  useDeepCompareEffect(() => {
    setRenderCount((c) => c + 1);
    if (colorAndCount) {
      const { count, color } = colorAndCount;
      setCount(count);
      setColor(color.name);
    }
  }, [colorAndCount]);

  useLayoutEffect(() => {
    setRenderCount((c) => c + 1);
  }, []);

  return (
    <>
      <div>UseEffect Run Count {renderCount}</div>
      <ColorInfo style={{ color }}>
        Color: {color} Count: {count}
      </ColorInfo>
    </>
  );
}
