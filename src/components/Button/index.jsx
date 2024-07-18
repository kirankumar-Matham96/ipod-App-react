import React from "react";
import styled from "styled-components";

const Button = styled.button`
  border: none;
  background: ${(props) => (props.bg ? props.bg : "none")};
  border-radius: ${(props) => (props.radius ? props.radius : "0px")};
  width: ${(props) => (props.width ? props.width : "auto")};
  height: ${(props) => (props.height ? props.height : "auto")};
  color: ${(props) => (props.color ? props.color : "gray")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "600")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.25rem")};
  cursor: pointer;
`;

export const ButtonComponent = (props) => {
  return <Button {...props}>{props.text}</Button>;
};
