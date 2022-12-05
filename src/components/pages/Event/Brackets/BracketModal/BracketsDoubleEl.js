import React, { useEffect, useState } from 'react'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectBrackets } from '../../../../../redux/components/eventBrackets'
import BracketCell from './BracketCell'
import BracketsBackground from './BracketsBackground'
import {
  createAreaFromChilds,
  createColumnsAreasByStepsCount,
  createDefaultArea,
  getBordersDirections,
  getBracketsBySteps,
} from './bracketsUtils'

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

const divideTopLoaserBr = (brackets) => {
  return (
    brackets?.length &&
    brackets.reduce(
      (prev, cur) => {
        if (cur.isLoserBracket) {
          const loserParents = cur.parents.filter((parent) =>
            brackets.some((cell) => {
              const { id, isLoserBracket } = cell
              return id == parent && isLoserBracket
            }),
          )
          const loserChilds = cur.children.filter((child) =>
            brackets.some((cell) => {
              const { id, isLoserBracket } = cell
              return id == child && isLoserBracket
            }),
          )
          prev.loserBrackets.push({ ...cur, parents: loserParents, children: loserChilds })
        } else if (!cur.isLoserBracket) {
          const topParents = cur.parents.filter((parent) =>
            brackets.some((cell) => {
              const { id, isLoserBracket } = cell
              return id == parent && !isLoserBracket
            }),
          )
          const topChilds = cur.children.filter((child) =>
            brackets.some((cell) => {
              const { id, isLoserBracket } = cell
              return id == child && !isLoserBracket
            }),
          )

          prev.topBrackets.push({ ...cur, parents: topParents, children: topChilds })
        }
        return prev
      },
      { topBrackets: [], loserBrackets: [] },
    )
  )
}

export default function BracketsDoubleEl({ updateBF }) {
  const [topBracketsBySteps, setTopBracketsBySteps] = useState(null)
  const [loserBracketsBySteps, setLoserBracketsBySteps] = useState(null)
  const [, bracketsFights] = useSelector(selectBrackets)

  useEffect(async () => {
    if (bracketsFights.data?.length) {
      const { topBrackets, loserBrackets } = divideTopLoaserBr(bracketsFights.data)
      topBrackets && getBracketsBySteps(topBrackets).then(setTopBracketsBySteps)
      loserBrackets && getBracketsBySteps(loserBrackets).then(setLoserBracketsBySteps)
      console.log('topBrackets: ', topBrackets)
      console.log('loserBrackets: ', loserBrackets)
    }
  }, [bracketsFights])

  const topBracketsLastStep = useMemo(() => {
    if (topBracketsBySteps) {
      const topBrKeys = Object.keys(topBracketsBySteps)
      return topBracketsBySteps[topBrKeys[topBrKeys.length - 1]].step
    }
  }, [topBracketsBySteps])

  const loserBracketsLastStep = useMemo(() => {
    if (loserBracketsBySteps) {
      const loserBrKeys = Object.keys(loserBracketsBySteps)
      return loserBracketsBySteps[loserBrKeys[loserBrKeys.length - 1]].step
    }
  }, [loserBracketsBySteps])

  return (
    <ColumnsWrapper>
      <TopBrackets
        style={{
          gridTemplateColumns: topBracketsLastStep && `repeat(${topBracketsLastStep}, 340px)`,
          gridTemplateAreas: createColumnsAreasByStepsCount(topBracketsLastStep),
        }}
      >
        {!!topBracketsLastStep &&
          Object.keys(topBracketsBySteps).map((key) => {
            const { cells, step, roundName } = topBracketsBySteps[key]
            const { cells: nextStepsCells } = topBracketsBySteps[+key + 1] || { cells: null }
            const cellsAreas =
              cells?.length >= (nextStepsCells?.length || 0)
                ? createDefaultArea(cells)
                : createAreaFromChilds(topBracketsBySteps[+key + 1]?.cells)

            const gridTemplateAreas = cellsAreas?.length && `'${cellsAreas.join("' '")}'`
            return (
              <Column key={`brackets_round_${step}`} style={{ gridArea: `step-${step}` }}>
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
                    {cells
                      .sort((a, b) => +a.fightNumber - +b.fightNumber)
                      .map((cell) => {
                        const borderDirection = cell.children.length
                          ? getBordersDirections(cell.id, cell.children, nextStepsCells)
                          : 'noChild'

                        console.log(
                          `${cell.id}\n`,
                          `borderDirectionт: `,
                          borderDirection,
                          '\n',
                          `cell: `,
                          cell,
                        )
                        return (
                          <BracketCell
                            key={`bracket_cell_${cell.id}`}
                            gridTemplateAreas={gridTemplateAreas}
                            updateBF={updateBF}
                            borderDirection={borderDirection}
                            cell={cell}
                          />
                        )
                      })}
                  </CellsWrapper>
                )}
              </Column>
            )
          })}
      </TopBrackets>
      <LoserBrackets
        style={{
          gridTemplateColumns: loserBracketsLastStep && `repeat(${loserBracketsLastStep}, 340px)`,
          gridTemplateAreas: createColumnsAreasByStepsCount(loserBracketsLastStep),
        }}
      >
        {!!Object.keys(loserBracketsBySteps || {})?.length &&
          Object.keys(loserBracketsBySteps).map((key) => {
            const { cells, step } = loserBracketsBySteps[key]
            const { cells: nextStepsCells } = loserBracketsBySteps[+key + 1] || { cells: null }
            const cellsAreas =
              cells?.length >= (nextStepsCells?.length || 0)
                ? createDefaultArea(cells)
                : createAreaFromChilds(loserBracketsBySteps[+key + 1]?.cells)

            const gridTemplateAreas = cellsAreas?.length && `'${cellsAreas.join("' '")}'`
            return (
              <Column key={`brackets_round_${step}`} style={{ gridArea: `step-${step}` }}>
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
                    {cells
                      .sort((a, b) => +a.fightNumber - +b.fightNumber)
                      .map((cell) => {
                        const borderDirection = cell.children.length
                          ? getBordersDirections(cell.id, cell.children, nextStepsCells)
                          : 'noChild'
                        return (
                          <BracketCell
                            key={`bracket_cell_${cell.id}`}
                            gridTemplateAreas={gridTemplateAreas}
                            updateBF={updateBF}
                            borderDirection={borderDirection}
                            cell={cell}
                          />
                        )
                      })}
                  </CellsWrapper>
                )}
              </Column>
            )
          })}
      </LoserBrackets>
      <BracketsBackground
        steps={
          topBracketsLastStep > loserBracketsLastStep ? topBracketsLastStep : loserBracketsLastStep
        }
      />
    </ColumnsWrapper>
  )
}

const ColumnsWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
`

const TopBrackets = styled.div`
  display: grid;
  grid-template-rows: 1fr;
`

const LoserBrackets = styled.div`
  display: grid;
  grid-template-rows: 1fr;
`

const Column = styled.div`
  min-width: 340px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 32px;
`

const CellsWrapper = styled.div`
  height: 100%;
`

const RoundName = styled.h4`
  font-weight: 600;
  font-size: 24px;
  color: #f2f2f2;
`
