import React from 'react'
import styled from 'styled-components'

export default function BracketWin() {
  return (
    <MainWrapper>
      <Win>W</Win>
    </MainWrapper>
  )
}

const Win = styled.p`
  width: 30px;
  height: min-content;
  align-items: center;
  justify-content: center;

  background: #1b1c22;

  border-radius: 8px;
  padding: 2px 8px;

  font-weight: 900;
  font-size: 12px;
  text-align: center;
  color: #6d4eea;
  background: #6d4eea;
  color: #ffffff;
`

const MainWrapper = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;

  height: calc(100% - 10px);
  width: calc(100% - 10px);
  display: flex;
  justify-content: flex-end;
`
