import React from 'react'
import styled from 'styled-components'
import { getFormattedStartTime } from '../bracketsUtils'

export default function MatDetailHeader({ dayStartTime, name, fightsFinished, fightsTotal }) {
  return (
    <Header>
      <MatDetails>{name}</MatDetails>
      <MatDetails>Начало {dayStartTime ? getFormattedStartTime(dayStartTime) : '--:--'}</MatDetails>
      <MatDetails>
        {fightsFinished} / {fightsTotal} схваток
      </MatDetails>
    </Header>
  )
}

const Header = styled.div`
  display: flex;
  grid-gap: 32px;

  @media screen and (max-width: 768px) {
    grid-gap: 24px;
  }
`

const MatDetails = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;

  @media screen and (max-width: 768px) {
    font-size: 16px;
    line-height: 24px;
  }
`
