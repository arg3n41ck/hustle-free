import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectBrackets } from '../../../../../redux/components/eventBrackets'
import BracketCell from './BracketCell'
import { createAreaFromChilds, createDefaultArea, getBracketsBySteps } from './bracketsUtils'

const getWrapperStyles = (type) => {
  switch (type) {
    case 'grid':
      return {
        display: 'grid',
        gridTemplateColumns: '1fr',
      }
    case 'flex':
      return {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }
    default:
      break
  }
}

export default function BracketsSingleEl() {
  const [bracketsBySteps, setBracketsBySteps] = useState(null)
  const [, bracketsFights] = useSelector(selectBrackets)

  useEffect(async () => {
    if (bracketsFights.data?.length) {
      getBracketsBySteps(bracketsFights?.data).then(setBracketsBySteps)
    }
  }, [bracketsFights])

  return (
    <ColumnsWrapper
      key={`Single_refresh_when_${Object.keys(bracketsBySteps || {})?.length || Math.random()}`}
    >
      {!!Object.keys(bracketsBySteps || {})?.length &&
        Object.keys(bracketsBySteps).map((key) => {
          const { roundName, cells } = bracketsBySteps[key]
          const { cells: nextStepsCells } = bracketsBySteps[+key + 1] || { cells: null }
          const cellsAreas =
            cells?.length >= nextStepsCells?.length
              ? createDefaultArea(cells)
              : createAreaFromChilds(bracketsBySteps[+key + 1]?.cells)

          const gridTemplateAreas = cellsAreas?.length && `'${cellsAreas.join("' '")}'`

          return (
            <Column key={`brackets_round_${roundName}`}>
              <RoundName>{roundName}</RoundName>
              {cells?.length && (
                <CellsWrapper
                  style={
                    cellsAreas
                      ? {
                          ...getWrapperStyles('grid'),
                          gridTemplateRows: `repeat(${cellsAreas?.length ?? cells?.length}, 1fr)`,
                          gridTemplateAreas: gridTemplateAreas,
                        }
                      : getWrapperStyles('flex')
                  }
                >
                  {cells.map((cell) => {
                    return (
                      <BracketCell
                        key={`bracket_cell_${cell.id}`}
                        gridTemplateAreas={gridTemplateAreas}
                        classes={cell?.fightRoundType == 0 ? 'noBorder' : ''}
                        cell={cell}
                      />
                    )
                  })}
                </CellsWrapper>
              )}
            </Column>
          )
        })}
    </ColumnsWrapper>
  )
}

const ColumnsWrapper = styled.div`
  width: 100%;
  display: flex;
`

const Column = styled.div`
  min-width: 360px;
  display: flex;
  flex-direction: column;
  padding: 32px;

  &:nth-child(odd) {
    background: rgba(27, 28, 34, 0.25);
  }
`

const CellsWrapper = styled.div`
  height: 100%;
`

const RoundName = styled.h4`
  font-weight: 600;
  font-size: 24px;
  color: #f2f2f2;
`
