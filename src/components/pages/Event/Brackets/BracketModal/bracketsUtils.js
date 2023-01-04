// import axios from 'axios'
// import { camelizeKeys } from 'humps'

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
  const brSteps = await bracketsFights
    .slice()
    .sort((a, b) => a.step - b.step)
    .reduce((prev, cur) => {
      const { step, fightRoundType } = cur
      if (!prev[step]) {
        prev[step] = {
          roundName: getBracketsRoundType[fightRoundType],
          cells: [],
          childrens: [],
          parents: [],
          step: step,
        }
      }

      const curWithCells = { ...cur }
      curWithCells.disbled = false
      if (curWithCells.children.length) {
        const cellWithSameChilds = bracketsFights.filter(({ children }) =>
          children.includes(curWithCells.children[0]),
        )

        console.log(curWithCells.children[0], cellWithSameChilds)

        if (cellWithSameChilds.length > 1) {
          cellWithSameChilds.sort((a, b) => +a.fightNumber - +b.fightNumber)
          const curCellIdx = cellWithSameChilds.findIndex(({ id }) => id == curWithCells.id)

          if (curCellIdx === 0) {
            curWithCells.borderDirection = 'lineDown'
          } else if (curCellIdx === 1) {
            curWithCells.borderDirection = 'lineUp'
          }
        } else if (cellWithSameChilds.length === 1) {
          curWithCells.borderDirection = 'straight'
        }
      }

      if (+step > 1 && prev[+step - 1]) {
        const parentsFrom1Step = prev[+step - 1].cells.reduce((prevParents, curParCell) => {
          if (curParCell.children?.length && curParCell.children.includes(cur.id)) {
            if (!!curParCell?.parentsFrom1Step) {
              prevParents = prevParents + (+curParCell?.parentsFrom1Step || 0)
            } else {
              prevParents = prevParents + 1
            }
          }
          return prevParents
        }, 0)

        curWithCells.parentsFrom1Step = parentsFrom1Step
      }

      prev[step].cells.push(curWithCells)
      prev[step].cells.sort((a, b) => a.fightNumber - b.fightNumber)
      cur.children?.length && prev[step].childrens.push(cur.children[0])
      prev[step].parents = [...prev[step].parents, ...cur.parents]
      return prev
    }, {})

  return brSteps
}

export const getThreeManBracketsBySteps = async (bracketsFights) => {
  const brSteps = await bracketsFights.reduce((prev, cur) => {
    const { step, fightNumber } = cur
    const curKey = (cur?.parents?.length || 0) < 2 ? 1 : 2
    const curParents = curKey == 1 ? [] : cur?.parents
    const rewrittenCur = { ...cur, parents: curParents, disabled: true }

    if (curKey == 1) {
      if (cur.children.length === 2) {
        rewrittenCur.borderDirection = 'lineDown'
      } else if (cur.children.length === 1) {
        rewrittenCur.borderDirection = 'lineUp'
      }
    }

    if ([4, 8, 9].includes(fightNumber)) {
      rewrittenCur.disabled = false
    }

    if (!prev[step]) {
      prev[step] = {}
      prev[step][curKey] = {
        cells: [rewrittenCur],
        childrens: [rewrittenCur.children[0]],
        parents: [...rewrittenCur.parents],
        step: curKey,
      }
    } else if (prev[step]) {
      if (prev[step][curKey]) {
        const { childrens, parents } = prev[step][curKey]
        prev[step][curKey].cells.push(rewrittenCur)
        prev[step][curKey].childrens = [...childrens, rewrittenCur.children[0]]
        prev[step][curKey].parents = [...parents, ...rewrittenCur.parents]
      } else if (!prev[step][curKey]) {
        prev[step][curKey] = {
          cells: [rewrittenCur],
          childrens: [rewrittenCur.children[0]],
          parents: [...rewrittenCur.parents],
          step: curKey,
        }
      }
    }

    return prev
  }, {})

  return brSteps
}

// export const getLocalBrackets = async (id) => {
//   try {
//     const {
//       data: { fights },
//     } = await axios.get(`http://192.168.0.107:8000/api/brackets/${id}/`)
//     return camelizeKeys(fights)
//   } catch (e) {
//     console.log(e)
//   }
// }

export const createAresJustFromIds = (cells) => cells?.map(({ id }) => `cell-${id}`)

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

export const createColumnsAreasByStepsCount = (bracketsCount) => {
  const bracketsSteps = []

  for (let step = 0; step < bracketsCount; step++) {
    bracketsSteps.push(`step-${step + 1}`)
  }
  return `'${bracketsSteps.join(' ')}'`
}
