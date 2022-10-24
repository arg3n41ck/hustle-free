import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectBrackets } from '../../../../../redux/components/eventBrackets'
import BracketCell from './BracketCell'
import {
  createAreaFromChilds,
  createDefaultArea,
  getBordersDirections,
  getBordersDirectionsForLosers,
  getBracketsBySteps,
  getLocalBrackets,
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

export default function BracketsDoubleEl() {
  const [topBracketsBySteps, setTopBracketsBySteps] = useState(null)
  const [loserBracketsBySteps, setLoserBracketsBySteps] = useState(null)
  // const [, bracketsFights] = useSelector(selectBrackets)

  useEffect(async () => {
    getLocalBrackets(27).then((res) => {
      const topBrackets = res?.length && res.filter(({ isLoserBracket }) => !isLoserBracket)

      const loserBrackets =
        res?.length &&
        res.reduce((prev, cur) => {
          if (cur.isLoserBracket) {
            const loserParents = cur.parents.filter((parent) =>
              res.some((cell) => {
                const { id, isLoserBracket } = cell
                return id == parent && isLoserBracket
              }),
            )
            prev.push({ ...cur, parents: loserParents })
          }
          return prev
        }, [])

      topBrackets && getBracketsBySteps(topBrackets).then(setTopBracketsBySteps)
      loserBrackets && getBracketsBySteps(loserBrackets).then(setLoserBracketsBySteps)
    })
    // if (bracketsFights.data?.length) {
    //   getBracketsBySteps(bracketsFights).then(setTopBracketsBySteps)
    // }
  }, [])

  return (
    <ColumnsWrapper>
      <TopBrackets>
        {!!Object.keys(topBracketsBySteps || {})?.length &&
          Object.keys(topBracketsBySteps).map((key) => {
            const { roundName, cells } = topBracketsBySteps[key]
            const { cells: nextStepsCells } = topBracketsBySteps[+key + 1] || { cells: null }
            const cellsAreas =
              cells?.length >= (nextStepsCells?.length || 0)
                ? createDefaultArea(cells)
                : createAreaFromChilds(topBracketsBySteps[+key + 1]?.cells)

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
                    {cells
                      .sort((a, b) => a.fightNumber - b.fightNumber)
                      .map((cell) => {
                        const borderDirection = cell.children.length
                          ? getBordersDirections(cell.id, cell.children, nextStepsCells)
                          : 'noChild'
                        return (
                          <BracketCell
                            key={`bracket_cell_${cell.id}`}
                            gridTemplateAreas={gridTemplateAreas}
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
      <LoserBrackets>
        {!!Object.keys(loserBracketsBySteps || {})?.length &&
          Object.keys(loserBracketsBySteps).map((key) => {
            const { roundName, cells } = loserBracketsBySteps[key]
            const { cells: nextStepsCells } = loserBracketsBySteps[+key + 1] || { cells: null }
            const cellsAreas =
              cells?.length >= (nextStepsCells?.length || 0)
                ? createDefaultArea(cells)
                : createAreaFromChilds(loserBracketsBySteps[+key + 1]?.cells)

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
                    {cells
                      .sort((a, b) => a.fightNumber - b.fightNumber)
                      .map((cell) => {
                        const borderDirection = cell.children.length
                          ? getBordersDirectionsForLosers(cell.id, cell.children, nextStepsCells)
                          : 'noChild'
                        return (
                          <BracketCell
                            key={`bracket_cell_${cell.id}`}
                            gridTemplateAreas={gridTemplateAreas}
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
    </ColumnsWrapper>
  )
}

const ColumnsWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
`

const TopBrackets = styled.div`
  display: flex;
`

const LoserBrackets = styled.div`
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

const RoundName = styled.h4`
  font-weight: 600;
  font-size: 24px;
  color: #f2f2f2;
`
