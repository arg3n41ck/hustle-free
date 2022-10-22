import axios from 'axios'
import { camelizeKeys } from 'humps'
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
        childrens: [],
        parents: [],
      }
    }

    const curWithCells = { ...cur }

    if (step != 1) {
      const parentsFrom1Step = prev[+step - 1].cells.reduce((prevParents, curParCell) => {
        if (curParCell.children?.length && curParCell.children.includes(cur.id)) {
          if (!!curParCell?.parentsFrom1Step) {
            prevParents = prevParents + curParCell?.parentsFrom1Step
          } else {
            prevParents = prevParents + 1
          }
        }
        return prevParents
      }, 0)

      curWithCells.parentsFrom1Step = parentsFrom1Step
    }

    prev[step].cells.push(curWithCells)
    cur.children?.length && prev[step].childrens.push(cur.children[0])
    prev[step].parents = [...prev[step].parents, ...cur.parents]
    return prev
  }, {})

  return brSteps
}

const getLocalBrackets = async () => {
  try {
    const {
      data: { fights },
    } = await axios.get('http://192.168.43.77:8000/api/brackets/12/')
    return camelizeKeys(fights)
  } catch (e) {
    console.log(e)
  }
}

const createDefaultArea = (cells) => {
  const results = cells?.reduce((prev, cur) => {
    const { parentsFrom1Step } = cur

    for (let i = 0; i < (parentsFrom1Step || 1); i++) {
      prev = [...prev, `cell-${cur.id}`]
    }
    return prev
  }, [])

  return results
}

const createAreaFromChilds = (childCells) => {
  const results = childCells?.reduce((prev, cur) => {
    const { parents } = cur
    const areas = parents?.length ? parents.map((p) => `cell-${p}`) : ['...']
    prev = [...prev, ...areas]
    return prev
  }, [])

  return results
}

const getBordersDirections = (parentId, childId, cellsFromNextStep) => {
  const cell = cellsFromNextStep?.length && cellsFromNextStep.find(({ id }) => id == childId)
  let borderDirection = 'noChild'
  if (cell) {
    const parentIndex = (cell?.parents || [])?.indexOf(parentId)
    console.log({ parentIndex })
    borderDirection =
      cell?.parents?.length == 1
        ? 'straight'
        : parentIndex == 0
        ? 'lineDown'
        : parentIndex == 1
        ? 'lineUp'
        : 'noChild'
  }

  return borderDirection
}

export default function BracketsSingleEl() {
  const [bracketsBySteps, setBracketsBySteps] = useState(null)

  useEffect(() => {
    getLocalBrackets().then(async (fights) => {
      const fBySteps = await getBracketsBySteps(fights)
      setBracketsBySteps(fBySteps)
    })
  }, [])
  console.log(bracketsBySteps)

  return (
    <ColumnsWrapper>
      {!!Object.keys(bracketsBySteps || {})?.length &&
        Object.keys(bracketsBySteps).map((key) => {
          const { roundName, cells } = bracketsBySteps[key]
          const { cells: nextStepsCells } = bracketsBySteps[+key + 1] || { cells: null }
          const cellsAreas =
            cells.length >= nextStepsCells?.length
              ? createDefaultArea(cells)
              : createAreaFromChilds(bracketsBySteps[+key + 1]?.cells)

          const gridTemplateAreas = cellsAreas?.length && `'${cellsAreas.join("' '")}'`

          return (
            <Column key={`brackets_round_${roundName}`}>
              <RoundName>{roundName}</RoundName>
              {cells?.length && (
                <CellsWrapper
                  style={{
                    gridTemplateRows: `repeat(${cellsAreas?.length ?? cells?.length}, 1fr)`,
                    gridTemplateAreas: gridTemplateAreas,
                  }}
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

const CellsWrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
`

const RoundName = styled.h4`
  font-weight: 600;
  font-size: 24px;
  color: #f2f2f2;
`
