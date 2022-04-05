import React from "react"
import styled from "styled-components"

const ScrollBlock = ({ title, onTabs, onViewToggle, path, children }) => {
  return (
    <WrapperBlock>
      <HeaderInfo>
        <HeaderText>{title}</HeaderText>
        <AddButton
          onClick={() => {
            onViewToggle()
            onTabs(path)
          }}
        >
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
          Добавить
        </AddButton>
      </HeaderInfo>
      <ScrollerBody>{children}</ScrollerBody>
    </WrapperBlock>
  )
}

const WrapperBlock = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 32px;
  margin: 32px 0;
  word-break: break-all;
`
const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 40px 0;
`
const HeaderText = styled.h2`
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: #333333;
`
const AddButton = styled.button`
  background-color: rgba(111, 207, 151, 0.1);
  padding: 12px;
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
    margin-right: 9px;
    min-width: 24px;
    min-height: 24px;
  }
  &:hover {
    background: #27ae60;
    color: #fff;
    transition: 0.4s;
    svg * {
      stroke: #fff;
      transition: 0.4s;
    } 
`
const ScrollerBody = styled.div`
  max-width: 832px;
  min-height: 155px;
  width: auto;
  margin: 5px 0;
  overflow-x: scroll;
  display: flex;
  &::-webkit-scrollbar {
    display: none;
  }
`
export default ScrollBlock
