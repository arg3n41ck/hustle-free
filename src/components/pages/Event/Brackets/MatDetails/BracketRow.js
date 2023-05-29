import React, { useMemo } from 'react'
import { getFormattedStartTime } from '../bracketsUtils'
import styled from 'styled-components'

export default function BracketRow({ bracket, selected, onSelect }) {
  const fightsFinished = +bracket?.fightsFinished || 0
  const fightsTotal = +bracket?.fightsTotal || 0
  const category = useMemo(() => {
    return `${bracket?.categoryName} / ${bracket?.level} / ${bracket?.fromAge} - ${bracket?.toAge} / ${bracket?.fromWeight} - ${bracket?.toWeight}`
  }, [bracket])

  return (
    <BracketWrapper
      className={`${selected ? 'selected' : ''}`}
      onClick={() => onSelect(bracket?.id)}
      fillPercent={(100 * fightsFinished) / fightsTotal}
    >
      <BracketCategory>{category}</BracketCategory>
      <Col>{`${fightsFinished} / ${fightsTotal}`}</Col>
      <Col>{bracket?.eta ? getFormattedStartTime(bracket?.eta) : '--:--'}</Col>
    </BracketWrapper>
  )
}

const BracketWrapper = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid transparent;
  border-bottom: 1px solid #1b1c22;
  display: grid;
  grid-template: 1fr / auto 88px 80px;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
    border-radius: 0 0 8px 8px;
  }

  &::after {
    content: '';
    height: 100%;

    background: rgba(28, 201, 56, 0.1);

    position: absolute;
    left: 0;
    top: 0;
  }

  &:hover {
    &::after {
      width: ${({ fillPercent }) => fillPercent}%;
    }
  }

  &.selected {
    border: 1px solid #6d4eea;
  }
`

const BracketCategory = styled.p`
  width: 100%;
  height: 100%;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #f2f2f2;

  padding: 28px 16px;
  border-right: 1px solid #1b1c22;
`

const Col = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #f2f2f2;

  border-right: 1px solid #1b1c22;

  &:last-child {
    border-right: none;
  }
`
