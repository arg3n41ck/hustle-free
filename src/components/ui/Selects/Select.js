import React from "react"
import styled from "styled-components"

const SelectUI = ({ children, ...props }) => {
  const { error } = props
  return (
    <Wrapper>
      <ImageWrapper>
        <svg
          width="18"
          height="11"
          viewBox="0 0 18 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 9L9.70711 9.70711L9 10.4142L8.29289 9.70711L9 9ZM17.7071 1.70711L9.70711 9.70711L8.29289 8.29289L16.2929 0.292892L17.7071 1.70711ZM8.29289 9.70711L0.292892 1.70711L1.70711 0.292893L9.70711 8.29289L8.29289 9.70711Z"
            fill="#828282"
          />
        </svg>
      </ImageWrapper>
      <Line error={error} />
      <Select {...props}>{children}</Select>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
`
const Select = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 100%;
  height: 56px;
  font-weight: 400;
  font-size: 1rem;
  padding: 0 10px;
  background: #ffffff;
  border: 1px solid ${(p) => (p.error ? "#d32f2f" : "#e0e0e0")};
  box-sizing: border-box;
  border-radius: 8px;
  &:focus {
    border: 2px solid #27ae60;
  }
  color: #333333;
  &:invalid,
  & option[value=""] {
    color: red;
  }
`
const ImageWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 16px;
  pointer-events: none;
`
const Line = styled.div`
  position: absolute;
  pointer-events: none;
  right: 50px;
  width: 1px;
  background: ${(p) => (p.error ? "#d32f2f" : "#e0e0e0")};
  height: 96%;
  top: 2%;
`

export default SelectUI
