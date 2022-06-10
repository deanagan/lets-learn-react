import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const StyledOrderedList = styled.ol`
  li {
    font-size: 0.8em;
  }
`;

const FragmentedList = ({ items }) => (
  <StyledOrderedList>
    {items.map((content) => (
      <li className="fragment" key={content.id}>
        {content.value}
      </li>
    ))}
  </StyledOrderedList>
);

const contents = [
  { id: uuidv4(), value: "React's phases to updating the DOM" },
  {
    id: uuidv4(),
    value:
      "Code structure - improving performance by moving down state down or lifting up content",
  },
  {
    id: uuidv4(),
    value: "useState and useReducer",
  },
  {
    id: uuidv4(),
    value: "useContext - avoid prop drilling",
  },
  {
    id: uuidv4(),
    value: "React.memo - reducing unnecessary component update",
  },
  {
    id: uuidv4(),
    value: "useEffect and useLayoutEffect - asynchronous and synchronous",
  },
  { id: uuidv4(), value: "useMemo and useCallback - optimisation tools" },
  {
    id: uuidv4(),
    value: "Using a custom hook for tracking re-renders",
  },
  { id: uuidv4(), value: "References" },
];

export default function TableOfContents() {
  return (
    <section>
      <h3>Contents:</h3>
      <FragmentedList items={contents} />
    </section>
  );
}
