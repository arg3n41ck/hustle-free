import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectBrackets } from '../../../../../redux/components/eventBrackets'
import BracketCell from './BracketCell'

export const getBracketsRoundType = {
  1: 'FINAL',
  2: 'SEMI_FINALS',
  3: 'QUARTER_FINALS',
  4: 'EIGHTH_FINALS',
  5: '16TH_FINALS',
  6: '32ND_FINALS',
  7: '64TH_FINALS',
  8: '128TH_FINALS',
  9: '256TH_FINALS',
  10: '512ND_FINALS',
}

const getBracketsBySteps = async (bracketsFights) => {
  const brSteps = await bracketsFights.reduce((prev, cur) => {
    const { step, fightRoundType } = cur
    if (!prev[step]) {
      prev[step] = {
        roundName: getBracketsRoundType[fightRoundType],
        cells: [],
      }
    }
    prev[step].cells.push(cur)
    return prev
  }, {})

  return brSteps
}

export default function BracketsSingleEl() {
  const [, bracketFights] = useSelector(selectBrackets)
  const [bracketsBySteps, setBracketsBySteps] = useState(null)
  const { data } = bracketFights

  useEffect(() => {
    getBracketsBySteps(data).then(setBracketsBySteps)
  }, [bracketFights])
  console.log(bracketsBySteps)
  return (
    <ColumnsWrapper>
      {!!Object.keys(bracketsBySteps || {})?.length &&
        Object.keys(bracketsBySteps).map((key) => {
          const { roundName, cells } = bracketsBySteps[key]
          return (
            <Column key={`brackets_round_${roundName}`}>
              <RoundName>{roundName}</RoundName>
              {cells?.length &&
                cells
                  .sort((a, b) => a.fightNumber - b.fightNumber)
                  .map((cell) => <BracketCell key={`bracket_cell_${cell.id}`} cell={cell} />)}
            </Column>
          )
        })}
    </ColumnsWrapper>
  )
}

const ColumnsWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  display: flex;
`

const Column = styled.div`
  min-width: 360px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;

  &:nth-child(odd) {
    background: rgba(27, 28, 34, 0.25);
  }
`

const RoundName = styled.h4`
  font-weight: 600;
  font-size: 24px;
  color: #f2f2f2;
`
