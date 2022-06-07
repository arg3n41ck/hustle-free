import React from "react"
import styled from "styled-components"

// typeButton = primary | secondary
const CustomButton = ({
  typeButton = "primary",
  borderRadius = "16px",
  height = "64px",
  children,
  disabled=false,
  ...props
}) => {
  return (
    <Button
      height={height}
      borderRadius={borderRadius}
      typeButton={typeButton}
      {...props}
      disabled={disabled}
    >
      {children}
    </Button>
  )
}

const Button = styled.button`
  width: 100%;
  height: ${(p) => p.height};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${(p) => p.borderRadius};
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
