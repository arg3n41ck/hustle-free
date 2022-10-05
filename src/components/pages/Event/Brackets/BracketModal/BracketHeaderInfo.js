import React from 'react'
import styled from 'styled-components'
import { theme } from '../../../../../styles/theme'

export default function BracketHeaderInfo({ title, allParticipants }) {
  return (
    <HeaderWrapper>
      <BracketText>
        Тип сетки: <b>{title}</b>
      </BracketText>
      <BracketText>
        Участников: <b>{allParticipants}</b>
      </BracketText>
    </HeaderWrapper>
  )
}

const BracketText = styled.p`
  min-height: 56px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 400;
  font-size: 18px;
  padding: 0 0 0 24px;
  border-left: 1px solid #333333;

  color: #bdbdbd;

  &:first-child {
    border: none;
    padding: 0;
  }

  b {
    color: #fff;
  }
`

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #1b1c22;
  border-radius: 16px;
  gap: 24px;
  padding: 16px;

  ${theme.mqMax('md')} {
    gap: 16px;
  }
`
