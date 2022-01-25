import styled from "styled-components"

const StyledOrderedList = styled.ol`
  li {
    font-size: 0.8em;
  }
`;

// const StyledFragmentedList = styled(FragmentedList)`

// `;



const FragmentedList = ({items}) => (
  <StyledOrderedList>
    {items.map((content) => (<li className="fragment" key={content.id}>{content.value}</li>))}
  </StyledOrderedList>
);



const contents = [
  { id: 1, value: "React's phases to updating the DOM"},
  { id: 2, value: "Code structure - our plan A to improve performance"},
  { id: 3, value: "React.memo - when we want to avoid component update"},
  { id: 4, value: "useMemo and useCallback - optimisation tools"},
  { id: 5, value: "useEffect and useLayoutEffect - asynchronous and synchronous"},
  { id: 6, value: "useState and useReducer - keeping track of states"},
  { id: 7, value: "References"},
]

export default function TableOfContents() {


  return (
    <section>
    <h3>Contents:</h3>
      <FragmentedList items={contents} />
    </section>
  )
}