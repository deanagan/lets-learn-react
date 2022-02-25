import { useEffect } from "react";
import styled from "styled-components";

export const TableRow = styled.tr``;
export const TableHeader = styled.thead``;
export const TableHeaderCell = styled.th``;
export const TableCell = styled.td``;
export const TableBody = styled.tbody``;

export const StyledTable = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 20%;
  margin-left: 40%;
  margin-bottom: 10px;
  border: 1px solid black;
  th,
  td {
    text-align: left;
    padding: 16px;
    border: 1px solid black;
    font-size: 0.5em;
  }
  tr:nth-child(even) {
    background-color: yellow;
  }
`;

const TopColors = ({ colors }) => {
  useEffect(() => {
    console.log("Top colors table re-rendering");
  }, [colors]);

  return (
    <StyledTable>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Top Colors</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {colors.map((p) => (
          <TableRow key={p}>
            <TableCell>{p}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </StyledTable>
  );
};

export default TopColors;
