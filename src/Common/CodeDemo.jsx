import {
  CodeFlexItem,
  FlexContainer,
  StyledParagraph,
  StyledPre,
} from "../Styles/StyledComponents";

export default function CodeDemo({ children, structures }) {
  const codeData = (codes) => {
    const firstCodeUniqueId = codes[0].uniqueId;
    const data = codes.map((code) => {
      return (
        <code
          key={code.uniqueId}
          className={
            code.uniqueId === firstCodeUniqueId
              ? "javascript"
              : "fragment javascript"
          }
          data-trim
          data-line-numbers={code.lineNumbers}
        >
          {code.src}
        </code>
      );
    });

    return data;
  };

  return (
    <>
      {structures.map(({ uniqueId, text, codes }) => {
        const data = codeData(codes);
        return (
          <section key={uniqueId}>
            <FlexContainer>
              <CodeFlexItem>
                <StyledParagraph>{text}</StyledParagraph>
                <StyledPre className="prettyprint">{data}</StyledPre>
              </CodeFlexItem>
              <>{children}</>
            </FlexContainer>
          </section>
        );
      })}
    </>
  );
}
