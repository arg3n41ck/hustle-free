import React from "react"
import styled from "styled-components"

const HeaderContent = ({ onToggle, children }) => {
  return (
    <Header>
      <IconWrapper onClick={onToggle}>
        <BurgerIcon />
      </IconWrapper>
      {children}
    </Header>
  )
}
const Header = styled.div`
  width: 100%;
  padding: 32px;
  display: flex;
`
export const TitleHeader = styled.h4`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
  display: flex;
  align-items: center;
`
const IconWrapper = styled.div`
  cursor: pointer;
  margin: 0 22px 0 6px;
  display: flex;
  align-items: center;
`
export default HeaderContent

const BurgerIcon = (props) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M6 8H26" stroke="#6D4EEA" strokeWidth="3" strokeLinecap="round" />
    <path d="M6 16H26" stroke="#6D4EEA" strokeWidth="3" strokeLinecap="round" />
    <path d="M6 24H26" stroke="#6D4EEA" strokeWidth="3" strokeLinecap="round" />
  </svg>
)
