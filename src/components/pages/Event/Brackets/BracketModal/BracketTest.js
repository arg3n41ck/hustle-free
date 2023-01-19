import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectBrackets } from '../../../../../redux/components/eventBrackets'
import BracketCell from './BracketCell'
import { bracketsFightsDistribution, getBracketsRoundType } from './bracketsUtils'

export default function BracketTest() {
  const [, bracketsFights] = useSelector(selectBrackets)
  const [fightRoundTypes, setFightRoundTypes] = useState([])

  const ditributedBracketFight = useMemo(() => {
    if (bracketsFights?.data?.length) {
      return bracketsFightsDistribution(bracketsFights.data)
    }
    return null
  }, [bracketsFights])

  return (
    <WaveWrapper rows={ditributedBracketFight?.length || 1}>
      <Zebras count={fightRoundTypes.length}>
        {!!fightRoundTypes?.length &&
          fightRoundTypes.map((frt) => (
            <Zebra key={`frt_${frt}`}>{getBracketsRoundType[frt]}</Zebra>
          ))}
      </Zebras>
      {!!ditributedBracketFight &&
        ditributedBracketFight
          .sort((a, b) => a.isLoserBracket - b.isLoserBracket)
          .map((bracketsFight) => (
            <GenerateBracketWave
              key={`bracket_cell_${bracketsFight?.id}`}
              bracketFight={bracketsFight}
              parentsCount={0}
              setFightRoundTypes={setFightRoundTypes}
              fightRoundTypes={fightRoundTypes}
              index={0}
            />
          ))}
    </WaveWrapper>
  )
}

const GenerateBracketWave = ({
  bracketFight,
  index,
  parentsCount,
  setFightRoundTypes,
  fightRoundTypes,
}) => {
  const { fightParents, ...cell } = bracketFight
  const parents = fightParents?.length && fightParents.map(({ id }) => id)
  const borderDirection = useMemo(() => {
    if (2 == parentsCount) {
      return index == 0 ? 'lineDown' : 'lineUp'
    }
    return !!parentsCount == 1 ? 'straight' : ''
  }, [index, parentsCount])

  useEffect(() => {
    const fightRoundType = bracketFight?.fightRoundType
    if (!bracketFight?.isLoserBracket && fightRoundType) {
      setFightRoundTypes((s) => {
        const frts = [...(s || []), fightRoundType]
        return frts.filter((frt, i) => frts.indexOf(frt) === i)
      })
    }
  }, [bracketFight])

  return (
    <FightRoundWrapper
      className={
        bracketFight?.fightRoundType == 1 && !bracketFight?.isLoserBracket ? 'withBorder' : ''
      }
    >
      <ChildColumn>
        <BracketCell cell={{ ...cell, parents, borderDirection }} />
        {!!cell.children?.length &&
          cell.children.map((child) => (
            <BracketCell key={`cell.children_${child?.id}`} cell={{ ...child }} />
          ))}
      </ChildColumn>
      <ParentsRow>
        {!!fightParents?.length &&
          fightParents.map((bf, i) => (
            <GenerateBracketWave
              key={`GenerateBracketWave_${bf?.id}`}
              index={i}
              parentsCount={fightParents?.length || 1}
              bracketFight={bf}
              setFightRoundTypes={setFightRoundTypes}
              fightRoundTypes={fightRoundTypes}
            />
          ))}
      </ParentsRow>
    </FightRoundWrapper>
  )
}

const WaveWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template: ${({ rows }) => `repeat(${rows}, min-content)`} / 1fr;
  padding: 112px 0 0 0;
`

const FightRoundWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;

  &.withBorder {
    padding: 0 0 32px 0;
    margin: 0 0 32px 0;
    border-bottom: 1px solid #333;
    justify-content: flex-end;
  }
`

const ParentsRow = styled.div`
  display: flex;
  flex-direction: column;
`

const ChildColumn = styled.div`
  min-width: 360px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 32px;
`

const Zebras = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template: 1fr / ${({ count }) => `repeat(${count}, 360px)`};
`

const Zebra = styled.div`
  font-weight: 600;
  font-size: 24px;
  color: #f2f2f2;
  padding: 48px 32px 0;

  &:nth-child(odd) {
    background: rgba(27, 28, 34, 0.25);
  }
`
