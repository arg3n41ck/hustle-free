import React from "react"
import styled from "styled-components"

// typeButton = primary | secondary
const CustomButton = ({ typeButton = "primary", children, ...props }) => {
  return (
    <Button typeButton={typeButton} {...props}>
      {children}
    </Button>
  )
}

const Button = styled.button`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  color: ${(p) => (p.typeButton === "primary" ? "#fff" : "#BDBDBD")};
  background: ${(p) =>
    p.typeButton === "primary"
      ? "linear-gradient(90deg, #3F82E1 0%, #7A3FED 100%)"
      : "#828282"};
  &:hover {
    transition: 1s;
    background: ${(p) => (p.typeButton === "primary" ? "#3F82E1" : "#828282")};
  }
`

export default CustomButton
