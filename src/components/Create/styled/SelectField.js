/* eslint-disable prettier/prettier */
import styled from "styled-components";

const SelectField = styled.select`
  padding: 8px;
  font-size: ${props => props.fontSize || "16px"};
  border: 1px solid ${props => (props.error ? "red" : "#ccc")};
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  background-color: ${props => (props.disabled ? "#f5f5f5" : "white")};

  &:focus {
    outline: none;
    border-color: ${props => (props.error ? "red" : "#4a90e2")};
  }
`;

export default SelectField;
