import styled from "styled-components";

export const Dropbtn = styled.div`
  /* display: inline-block; */
  width: 80px;
  color: black;
  text-align: center;
  padding: 10px 16px;
  margin-bottom: 1px;
  text-decoration: none;
  border: 1px solid black;
  font-size: 0.5em;
`;

export const DropDownContent = styled.div`
  display: block;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  font-size: 0.5em;
`;

export const DropDownItem = styled.a`
  color: black;
  padding: 10px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  margin-bottom: 1px;
  cursor: pointer;
  &:hover {
    background-color: #13795a;
  }
`;

export const DropDownLi = styled.li`
  display: inline-block;
  margin-bottom: 4px;
  padding-top: -1px;
  &:hover {
    background-color: gray;
  }
`;

export const Button = styled.button`
  margin: 5px;
  color: ${(props) => props.color};
`;

export const ColoredHeader = styled.h4`
  color: ${(props) => props.color};
`;

export const Comment = styled.p`
  font-size: 1.5rem;
  display: inline-block;
`;
