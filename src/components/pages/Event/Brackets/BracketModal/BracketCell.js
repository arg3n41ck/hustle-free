import React, { useCallback, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  fetchBracketResults,
  fetchBracketsFightsByParams,
  selectBrackets,
} from '../../../../../redux/components/eventBrackets'
import BracketCellFighter from './BracketCellFighter'
import ScoreTooltip from './ScoreTooltip'
import { ScoreboardContext } from '../Scoreboard/context'

export default function BracketCell({ cellRef, cell, gridTemplateAreas, classes }) {
  const { id, fighters, parents, borderDirection, fightRoundType, scoreboard } = cell
  const [, , participantAthletes, , bracket] = useSelector(selectBrackets)
  const { ogAndIsMyEvent } = useContext(ScoreboardContext)
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
        countryCode: participantCat?.athlete?.user?.country,
        team: participantCat?.team,
      }
      return fighterDetails
    },
    [participantAthletes?.data, fighters],
  )

  const onWin = () => {
    dispatch(fetchBracketsFightsByParams({ bracket: bracket?.id, type: bracket?.bracketType }))
    dispatch(fetchBracketResults({ bracketId: bracket?.id }))
  }

  return (
    <>
      <CellWrapper
        ref={cellRef}
        className={`${parents?.length ? 'parents' : ''} ${borderDirection} ${classes || ''}`}
        gridArea={gridTemplateAreas && `cell-${id}`}
      >
        <DragWrapper>
          {/* <FightNum>
            ST: "<b>{cell?.fightStartTime}</b>"; ET: "<b>{cell?.fightEndTime}</b>"
          </FightNum> */}

          <BFPrefName>{`${cell?.matPrefix} - ${cell?.fightNumber}`}</BFPrefName>

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
            orientation={'second'}
          />
          {!cell?.winner && ogAndIsMyEvent && fighters?.length === 2 && (
            <ScoreTooltip
              fightStartTime={cell?.fightStartTime}
              fightsStep={fightRoundType}
              scoreboard={scoreboard}
              fightNumber={cell?.fightNumber}
              matPrefix={cell?.matPrefix}
              fightId={id}
            />
          )}
        </DragWrapper>
      </CellWrapper>
    </>
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
      width: 246px;
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
    border: none;
  }

  &:hover {
    & .scoreboard-tooltip {
      display: flex;
    }
  }
`

const DragWrapper = styled.div`
  width: fit-content;
  border-radius: 8px;
  border: 2px solid #333333;
  background: #1b1c22;

  &:hover {
    background: linear-gradient(0deg, rgba(109, 78, 234, 0.1), rgba(109, 78, 234, 0.1)), #141519;
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

  & b {
    color: pink;
  }
`

const BFPrefName = styled.div`
  position: absolute;
  left: -20px;
  top: 50%;
  background: #0f0f10;
  border: 1px solid #333333;
  border-radius: 10px;

  transform: translateY(-50%);

  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  padding: 3px 8px;

  text-align: center;

  color: #ffffff;

  z-index: 10;
`
