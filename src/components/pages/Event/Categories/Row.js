import React, { useState } from "react"
import { Collapse } from "@mui/material"
import styled from "styled-components"

function Row({ pcItem: { name } }) {
  const [open, setOpen] = useState(false)
  return (
    <CollapseWrapper>
      <ColHead onClick={() => setOpen(!open)}>
        <h3>{name}</h3>
        <CollapseArrow open={open} />
      </ColHead>

      <Collapse in={open}>
        <div />
      </Collapse>
    </CollapseWrapper>
  )
}

export default Row

const CollapseWrapper = styled.div`
  padding: 32px 32px 28px;
  background: #1b1c22;
  border: 1px solid #333333;
  border-radius: 16px;
`

const ColHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3 {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    color: #f2f2f2;
  }
`

const Arrow = styled.svg`
  transform: rotate(${({ open }) => (open ? "0deg" : "180deg")});
  transition: 0.1s ease-in;
`

export const CollapseArrow = ({ open }) => (
  <Arrow
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    open={open}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.06066 21.0607C8.47487 21.6464 7.52513 21.6464 6.93934 21.0607C6.35355 20.4749 6.35355 19.5251 6.93934 18.9393L9.06066 21.0607ZM16 12L14.9393 10.9393L16 9.87868L17.0607 10.9393L16 12ZM25.0607 18.9393C25.6464 19.5251 25.6464 20.4749 25.0607 21.0607C24.4749 21.6464 23.5251 21.6464 22.9393 21.0607L25.0607 18.9393ZM6.93934 18.9393L14.9393 10.9393L17.0607 13.0607L9.06066 21.0607L6.93934 18.9393ZM17.0607 10.9393L25.0607 18.9393L22.9393 21.0607L14.9393 13.0607L17.0607 10.9393Z"
      fill="#828282"
    />
  </Arrow>
)
