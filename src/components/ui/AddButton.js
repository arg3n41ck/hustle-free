import React from "react"
import styled from "styled-components"

const AddButton = ({ children }) => {
  return (
    <AddButtons>
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5 6L12.5 18"
          stroke="#27AE60"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          d="M18.5 12L6.5 12"
          stroke="#27AE60"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
      {children}
    </AddButtons>
  )
}

const AddButtons = styled.button`
  width: 100%;
  max-width: 390px;
  background-color: rgba(111, 207, 151, 0.1);
  padding: 20px 0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #27ae60;
  svg {
    margin-right: 16px;
  }
  &:hover {
    background: #27ae60;
    color: #fff;
    transition: 0.4s;
    svg * {
      stroke: #fff;
      transition: 0.4s;
    }
  }
`

export default AddButton
