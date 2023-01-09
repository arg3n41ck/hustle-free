import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectBrackets } from '../../../../../redux/components/eventBrackets'
import BracketCell from './BracketCell'
import { createDefaultArea, getThreeManBracketsBySteps } from './bracketsUtils'

export default function BracketsThreeMan() {
  const [bracketsBySteps, setBracketsBySteps] = useState(null)
  const [, bracketsFights] = useSelector(selectBrackets)

  useEffect(async () => {
    if (bracketsFights.data?.length) {
      getThreeManBracketsBySteps(bracketsFights?.data).then(setBracketsBySteps)
    }
  }, [bracketsFights])

  return (
    <div>
      <RoundNameWrapper>
        <RoundName>SEMI_FINALS</RoundName>
        <RoundName>FINAL</RoundName>
      </RoundNameWrapper>
      <ColumnsWrapper
        style={{
          gridTemplateRows: `repeat(${
            bracketsBySteps && Object.keys(bracketsBySteps)?.length
          }, 1fr)`,
        }}
      >
        {!!Object.keys(bracketsBySteps || {})?.length &&
          Object.keys(bracketsBySteps)
            .sort((aStep, bStep) => aStep - bStep)
            .map((rowIndex) => {
              return (
                <Row key={`brackets_round_${rowIndex}`}>
                  {Object.keys(bracketsBySteps[rowIndex]).map((column) => {
                    const { cells, step } = bracketsBySteps[rowIndex][column]
                    const cellsAreas = createDefaultArea(cells)
                    const gridTemplateAreas = cellsAreas?.length && `'${cellsAreas.join("' '")}'`

                    return (
                      <Column key={`brackets_round_${column}_${step}`}>
                        {cells?.length && (
                          <CellsWrapper
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr',
                              gridTemplateRows: `repeat(${
                                cellsAreas?.length ?? cells?.length
                              }, 1fr)`,
                              gridTemplateAreas: gridTemplateAreas,
                            }}
                          >
                            {cells
                              .sort((a, b) => a.fightNumber - b.fightNumber)
                              .map((cell) => {
                                return (
                                  <BracketCell
                                    key={`bracket_cell_${cell.id}`}
                                    gridTemplateAreas={gridTemplateAreas}
                                    cell={cell}
                                  />
                                )
                              })}
                          </CellsWrapper>
                        )}
                      </Column>
                    )
                  })}
                </Row>
              )
            })}
      </ColumnsWrapper>
    </div>
  )
}

const ColumnsWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  display: grid;
  grid-template-columns: 1fr;
`

const Row = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`

const Column = styled.div`
  min-width: 360px;
  height: 100%;
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

const RoundNameWrapper = styled.div`
  display: grid;
  grid-template: 1fr / repeat(2, 360px);
`

const RoundName = styled.h4`
  height: 100%;
  font-weight: 600;
  font-size: 24px;
  color: #f2f2f2;

  padding: 16px 32px 0;

  &:nth-child(odd) {
    background: rgba(27, 28, 34, 0.25);
  }
`
