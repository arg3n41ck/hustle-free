import React from "react"
import styled from "styled-components"

const ScrollerBlock = ({ title, onTabs, onViewToggle, path, children }) => {
  return (
    <WrapperBlock>
      <HeaderInfo>
        <HeaderText>{title}</HeaderText>
        <AddButton
          onClick={() => {
            onViewToggle && onViewToggle()
            onTabs && onTabs(path)
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
      <HR />
      <ScrollerFooter>
        <button type={"button"} onClick={() => onTabs(path)}>
          Посмотреть все
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.5 12L19.2071 11.2929L19.9142 12L19.2071 12.7071L18.5 12ZM6.5 13C5.94771 13 5.5 12.5523 5.5 12C5.5 11.4477 5.94771 11 6.5 11V13ZM15.2071 7.29289L19.2071 11.2929L17.7929 12.7071L13.7929 8.70711L15.2071 7.29289ZM19.2071 12.7071L15.2071 16.7071L13.7929 15.2929L17.7929 11.2929L19.2071 12.7071ZM18.5 13H6.5V11H18.5V13Z"
              fill="#828282"
            />
          </svg>
        </button>
      </ScrollerFooter>
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
  margin-bottom: 32px;
`
const HeaderText = styled.h2`
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: #333333;
`
const AddButton = styled.button`
  width: 100%;
  max-width: 150px;
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
const HR = styled.div`
  border-top: 1px solid #e5e5e5;
  margin: 24px 0;
`
const ScrollerFooter = styled.div`
  display: flex;
  justify-content: center;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #828282;
    text-align: center;
    margin-right: 22px;
    background: #fff;
    svg {
      margin-left: 22px;
    }
  }
`
export default ScrollerBlock
