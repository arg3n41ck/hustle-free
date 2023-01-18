import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectCountriesAndCities } from '../../../../../redux/components/countriesAndCities'
import {
  fetchBracketResults,
  fetchBracketsFightsByParams,
  selectBrackets,
} from '../../../../../redux/components/eventBrackets'
import BracketCellFighter from './BracketCellFighter'

export default function BracketCell({ cell, gridTemplateAreas, classes }) {
  const { id, fighters, parents, borderDirection, children } = cell
  const [, , participantAthletes] = useSelector(selectBrackets)
  const bracket = useSelector((state) => state.brackets.bracket)
  const [countries] = useSelector(selectCountriesAndCities)
  const dispatch = useDispatch()

  const getFighterDetails = useCallback(
    (fighter) => {
      const participantCat =
        fighter &&
        participantAthletes?.data?.find((pc) => {
          return pc?.athlete?.id == fighter?.athlete?.id
        })

      const fighterDetails = participantCat?.athlete && {
        id: fighter.id,
        athlete: participantCat?.athlete,
        countryCode:
          countries?.length &&
          countries?.find(({ id }) => id == participantCat?.athlete?.user?.counrty),
        team: participantCat?.team,
      }
      return fighterDetails
    },
    [participantAthletes, fighters],
  )

  const onWin = () => {
    dispatch(fetchBracketsFightsByParams({ bracket: bracket?.id, type: bracket?.bracketType }))
    dispatch(fetchBracketResults({ bracketId: bracket?.id }))
  }

  return (
    <CellWrapper
      className={`${parents?.length ? 'parents' : ''} ${borderDirection} ${classes || ''}`}
      gridArea={gridTemplateAreas && `cell-${id}`}
    >
      <FightNum>
        ID: {id}, CH: {!!children?.[0] && children[0]} {!!children?.[1] && children[1]}
      </FightNum>
      <BracketCellFighter
        cell={cell}
        fighter={fighters[0] ? getFighterDetails(fighters[0]) : null}
        opponent={fighters[1]?.id}
        onWin={onWin}
        orientation={'first'}
      />
      <BracketCellFighter
        cell={cell}
        fighter={fighters[1] ? getFighterDetails(fighters[1]) : null}
        opponent={fighters[0]?.id}
        onWin={onWin}
        orientation={'second'}
      />
    </CellWrapper>
  )
}

const CellWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template: min-content min-content / 1fr;
  grid-area: ${({ gridArea }) => gridArea || 'unset'};
  align-content: center;
  padding: 16px 0;
  z-index: 2;

  &::after,
  &::before {
    content: '';
    height: 50%;
    position: absolute;
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
    border-top: 2px solid #333;
  }

  &.lineDown,
  &.lineUp,
  &.straight {
    height: 100%;
    &::after,
    &::before {
      width: calc(100% + 32px);
    }
  }

  &.parents {
    &::after,
    &::before {
      width: 224px;
      left: -32px;
    }

    &.lineDown,
    &.lineUp,
    &.straight {
      &::after,
      &::before {
        width: calc(100% + 64px);
        left: -32px;
      }
    }
  }

  &.lineDown {
    &::after {
      border-right: 2px solid #333;
    }
  }
  &.lineUp {
    &::before {
      border-right: 2px solid #333;
    }
  }

  &.noBorder::after,
  &.noBorder::before {
    width: 208px;
    height: 50%;
    left: 0;
  }
`

const FightNum = styled.div`
  position: absolute;
  top: 49%;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;

  background: #0f0f10;

  border: 1px solid #333333;
  border-radius: 60px;

  transform: translateY(-50%);
  font-weight: 700;
  font-size: 18px;
  padding: 5px;
  background: #000;
`
