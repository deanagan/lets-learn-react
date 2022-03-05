import { v4 as uuidv4 } from "uuid";

import { FragmentedUrlList } from "../Demo/StyledComponents";

const references = [
  {
    id: uuidv4(),
    link: "https://reactjs.org/",
    text: "Offical React Site",
  },
  {
    id: uuidv4(),
    link: "https://www.pluralsight.com/courses/optimize-performance-react",
    text: "Optimize Performance for React",
  },
  {
    id: uuidv4(),
    link: "https://reacttraining.com/blog/react-inline-functions-and-performance",
    text: "React Inline Functions and Performance",
  },
  {
    id: uuidv4(),
    link: "https://kentcdodds.com/blog/usememo-and-usecallback",
    text: "When to useMemo and useCallback",
  },
  {
    id: uuidv4(),
    link: "https://kentcdodds.com/blog/fix-the-slow-render-before-you-fix-the-re-render",
    text: "Fix the slow render before you fix the re-render",
  },
  {
    id: uuidv4(),
    link: "https://kentcdodds.com/blog/the-state-initializer-pattern",
    text: "The state initializer pattern",
  },
  {
    id: uuidv4(),
    link: "https://overreacted.io/before-you-memo/",
    text: "Before you memo",
  },
  {
    id: uuidv4(),
    link: "https://blog.logrocket.com/rethinking-hooks-memoization/",
    text: "Rethinking Hooks Memoization",
  },
  {
    id: uuidv4(),
    link: "https://dmitripavlutin.com/react-useref-guide/",
    text: "React useRef Guide",
  },
  {
    id: uuidv4(),
    link: "https://blog.logrocket.com/guide-to-react-useeffect-hook/",
    text: "Guide to useEffect",
  },
];

export default function References() {
  return (
    <section>
      <h3>References:</h3>
      <FragmentedUrlList items={references} />
    </section>
  );
}
