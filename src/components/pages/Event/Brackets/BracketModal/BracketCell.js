import React from 'react'
import styled from 'styled-components'

export default function BracketCell({ cell }) {
  const { id, fighters, children } = cell
  return (
    <CellWrapper>
      <Self>{id}</Self>
      <FighterWrapper>{fighters[0] || '?'}</FighterWrapper>
      <FighterWrapper>{fighters[1] || '?'}</FighterWrapper>
      {!!children?.length && <Children>{children[0].id}</Children>}
    </CellWrapper>
  )
}

const CellWrapper = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  grid-template: min-content min-content / 1fr;
  align-content: center;
  padding: 16px 0;
`

const FighterWrapper = styled.div`
  min-height: 56px;
  width: 208px;
  background: #1b1c22;
  border: 1px solid #333333;
  display: flex;
  justify-content: flex-end;

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:nth-child(2) {
    border-radius: 0 0 8px 8px;
    border-top: none;
  }
`

const Self = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  font-weight: 700;
  font-size: 40px;
  padding: 10px;
  border-radius: 10px;
  background: #000;
  z-index: 1;
`
const Children = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  font-weight: 700;
  font-size: 40px;
  padding: 10px;
  border-radius: 10px;
  background: #333333;
  z-index: 1;
`
