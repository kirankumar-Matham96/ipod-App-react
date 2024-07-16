import React from "react";
import styled from "styled-components";

const Button = styled.button`
  border: none;
  background: ${(props) => (props.color ? props.color : "none")};
  border-radius: ${(props) => (props.radius ? props.radius : "0px")};
  width: ${(props) => (props.width ? props.width : "auto")};
  height: ${(props) => (props.height ? props.height : "auto")};
  color: gray;
  font-weight: 600;
  font-size: 1.25rem;
  cursor: pointer;
`;

export const ButtonComponent = (props) => {
  return <Button {...props}>{props.text}</Button>;
};
