import React from "react"
import styled from "styled-components"
import BurgerIcon from "../../../public/svg/burger.svg"

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
