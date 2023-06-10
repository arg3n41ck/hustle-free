// import axios from 'axios'
// import { camelizeKeys } from 'humps'

import { format } from 'date-fns'

//gotov'sya tebya jdet polnyi pizdavorot)))

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

//не пытайся понять этот код, ахахаххахахахахаххааххаха
// она работает только для робин, лучше переписать что-то другое для робин
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
        const parentsChilds = prev[+step - 1].childrens
        prev[step].templateAreas = parentsChilds?.sort().map((id) => `cell-${id}`)

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
      prev[step].cells.sort((a, b) => a.children?.[0] - b.children?.[0])
      cur.children?.length && prev[step].childrens.push(cur.children[0])
      prev[step].parents = [...prev[step].parents, ...cur.parents]
      return prev
    }, {})
  return brSteps
}

export const mapBracketsFights = (bracketFightsFreezen) => {
  const bracketsFights = [...bracketFightsFreezen]
  if (
    bracketsFights.length > 1 &&
    !bracketsFights[0]?.isLoserBracket &&
    !bracketsFights[0]?.fightParents?.length
  ) {
    console.log({ bracketsFights })
    bracketsFights.reverse()
  }
  return bracketsFights.reduce((prev, cur, i) => {
    const { isLoserBracket, fightParents } = cur
    if (!isLoserBracket && !fightParents?.length && !!prev[0]) {
      prev[0] = { ...prev[0], children: [cur] }
      return prev
    }

    prev.push(cur)
    return prev
  }, [])
}

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

//tut polnyi pizdecc
export const getFighterPlace = (params) => {
  const { bracketType, winner, cellPlace, fighter } = params

  if (fighter && winner) {
    if ([1, 2, 3, 4].includes(bracketType)) {
      if (!cellPlace) {
        return null
      }
      if (cellPlace == 1) {
        return fighter == winner ? 1 : 2
      } else if (cellPlace == 3) {
        if (bracketType !== 1 && fighter == winner) {
          return 3
        } else if (bracketType === 1 && fighter !== winner) {
          return 3
        }
      }
    }
  }

  return null
}

export const BF_DND_ACCEPT_TYPE = `BF_DND_ACCEPT_TYPE`

export const getFormattedStartTime = (eta) => {
  const timeParts = eta?.split(':')
  const dateObject = new Date()
  dateObject.setHours(timeParts[0], timeParts[1], timeParts[2])
  if (!isNaN(dateObject.valueOf())) {
    return format(dateObject, 'HH:mm')
  }
  return undefined
}
