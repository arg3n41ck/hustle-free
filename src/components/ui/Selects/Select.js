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
            fill="#fff"
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
  height: 64px;
  font-weight: 400;
  font-size: 1rem;
  padding: 20px;
  background: inherit;
  border: 1.5px solid ${(p) => (p.error ? "#d32f2f" : "#333")};
  box-sizing: border-box;
  border-radius: 16px;
  color: #f2f2f2;
  &:invalid,
  & option[value=""] {
    color: #bdbdbd;
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
  width: 1.5px;
  background: ${(p) => (p.error ? "#d32f2f" : "#333")};
  height: 96%;
  top: 2%;
`

export default SelectUI
