import axios from 'axios'
import { camelizeKeys } from 'humps'

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

export const getBracketsBySteps = async (bracketsFights) => {
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
      const parentsFrom1Step = prev[+step - 1]?.cells.reduce((prevParents, curParCell) => {
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

export const getLocalBrackets = async (id) => {
  try {
    const {
      data: { fights },
    } = await axios.get(`http://192.168.0.107:8000/api/brackets/${id}/`)
    return camelizeKeys(fights)
  } catch (e) {
    console.log(e)
  }
}

export const createDefaultArea = (cells) => {
  const results = cells?.reduce((prev, cur) => {
    const { parentsFrom1Step } = cur

    for (let i = 0; i < (parentsFrom1Step || 1); i++) {
      prev = [...prev, `cell-${cur.id}`]
    }
    return prev
  }, [])

  return results
}

export const createAreaFromChilds = (childCells) => {
  const results = childCells?.reduce((prev, cur) => {
    const { parents } = cur
    const areas = parents?.length ? parents.map((p) => `cell-${p}`) : ['...']
    prev = [...prev, ...areas]
    return prev
  }, [])

  return results
}

export const getBordersDirections = (parentId, childId, cellsFromNextStep) => {
  const cell = cellsFromNextStep?.length && cellsFromNextStep.find(({ id }) => childId.includes(id))
  let borderDirection = 'noChild'

  if (cell) {
    const parentIndex = (cell?.parents || [])?.indexOf(parentId)
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

export const getBordersDirectionsForLosers = (parentId, childId, cellsFromNextStep) => {
  const cell = cellsFromNextStep?.length && cellsFromNextStep.find(({ id }) => childId.includes(id))
  let borderDirection = 'noChild'

  if (cell) {
    const parentIndex = (cell?.parents || [])?.indexOf(parentId)
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
