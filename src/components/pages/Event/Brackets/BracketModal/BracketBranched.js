import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectBrackets } from '../../../../../redux/components/eventBrackets'
import BracketCell from './BracketCell'
import { mapBracketsFights, getBracketsRoundType } from '../bracketsUtils'

export default function BracketBranched() {
  const [, bracketsFights] = useSelector(selectBrackets)
  const [fightRoundTypes, setFightRoundTypes] = useState([])

  const mapedBracketFight = useMemo(() => {
    if (bracketsFights?.data?.length) {
      return mapBracketsFights(bracketsFights.data)
    }
    return null
  }, [bracketsFights])

  return (
    <WaveWrapper rows={mapedBracketFight?.length || 1}>
      <Zebras count={fightRoundTypes.length}>
        {!!fightRoundTypes?.length &&
          fightRoundTypes.map((frt) => (
            <Zebra key={`frt_${frt}`}>{getBracketsRoundType[frt]}</Zebra>
          ))}
      </Zebras>
      {!!mapedBracketFight &&
        mapedBracketFight
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
  const cellRef = useRef()
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
        <BracketCell
          cellRef={cellRef}
          cell={{ ...cell, parents, borderDirection, fightRoundType: bracketFight?.fightRoundType }}
        />
        {!!cell.children?.length && cellRef?.current && (
          <OversideBacketCellWrapper
            top={+cellRef?.current?.offsetTop + 168}
            left={cellRef?.current?.offsetLeft}
          >
            {cell.children.map((child) => (
              <BracketCell
                key={`cell.children_${child?.id}`}
                cell={{ ...child, fightRoundType: bracketFight?.fightRoundType }}
              />
            ))}
          </OversideBacketCellWrapper>
        )}
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
  min-height: 700px;
  position: relative;
  display: grid;
  grid-template: ${({ rows }) => `repeat(${rows}, min-content)`} / 1fr;
  padding: 112px 0 0 0;
`

const FightRoundWrapper = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row-reverse;

  &.withBorder {
    min-height: 610px;
    padding: 0 0 32px 0;
    margin: 0 0 32px 0;
    border-bottom: 1px solid #333;
    justify-content: flex-end;
  }
`

const ParentsRow = styled.div`
  height: 100%;
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

const OversideBacketCellWrapper = styled.div`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
`
