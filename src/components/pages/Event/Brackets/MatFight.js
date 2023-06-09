import React, { useContext, useMemo } from 'react'
import {
  FightStatusBeReady,
  FightStatusFinish,
  FightStatusGoToBullPen,
  FightStatusInProgress,
} from '../../../../assets/svg/icons'
import { getFormattedStartTime } from './bracketsUtils'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useMediaQuery } from '@mui/material'
import { ScoreboardContext } from './Scoreboard/context'

export default function MatFight({ fight, bracketId, nextBFStatus, category }) {
  const {
    push: routerPush,
    query: { id: eventId },
  } = useRouter()
  const { open, onOpen } = useContext(ScoreboardContext)
  const lg = useMediaQuery('(min-width: 1200px)')
  const {
    id: fightId,
    status,
    fightNumber,
    prefix,
    fighters,
    fightStartTime,
    scoreboard,
    winner,
  } = fight

  const statusIcon = useMemo(() => {
    if (status == 4) {
      return <FightStatusInProgress />
    } else if (nextBFStatus == 4) {
      return <FightStatusBeReady />
    } else if (status == 3) {
      return <FightStatusFinish />
    } else {
      return <FightStatusGoToBullPen />
    }
  }, [status])

  return (
    <FightingWrapper>
      <FightingContent>
        <Category>{category}</Category>
        <Details>
          <FightStatus>
            {statusIcon}
            <p>{`${prefix} - ${fightNumber}`}</p>
          </FightStatus>
          <Fighters>
            {!!fighters?.length &&
              fighters.map((fighter, i) => (
                <Fighter key={`${fightNumber}-${i}`}>
                  <FullName>{fighter?.fullName}</FullName>
                  <Team>{fighter?.team}</Team>
                  {fighter?.id === winner && <Winner>W</Winner>}
                </Fighter>
              ))}
          </Fighters>
          {fightStartTime && <Time>{getFormattedStartTime(fightStartTime)}</Time>}
        </Details>
      </FightingContent>
      <ActionsWrapper>
        {!winner && lg && fighters?.length === 2 && (
          <Button onClick={() => !open && onOpen(scoreboard, fightId)}>Старт</Button>
        )}
        <Button onClick={() => routerPush(`/events/${eventId}/brackets/bracket/${bracketId}/`)}>
          Сетка
        </Button>
      </ActionsWrapper>
    </FightingWrapper>
  )
}

const ActionsWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: none;
  justify-content: flex-end;
  align-items: center;
  grid-gap: 16px;
  padding: 16px;
  top: 0;
  left: 0;

  @media screen and (max-width: 768px) {
    padding: 8px;
    align-items: center;
  }
`

const FightingWrapper = styled.div`
  position: relative;
  border-bottom: 1px solid #1b1c22;
  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: linear-gradient(0deg, rgba(109, 78, 234, 0.07), rgba(109, 78, 234, 0.07)), #141519;

    ${ActionsWrapper} {
      display: flex;
    }
  }
`

const FightingContent = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 8px;
  padding: 14px 16px;

  @media screen and (max-width: 768px) {
    padding: 8px;
  }
`

const Category = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  display: flex;
  align-items: center;
  color: #f2f2f2;
`

const Details = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 12px;

  @media screen and (max-width: 768px) {
    grid-gap: 8px;
  }
`

const FightStatus = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 4px;

  & > p {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    display: flex;
    align-items: center;
    color: #f2f2f2;

    @media screen and (max-width: 768px) {
      font-size: 20px;
      line-height: 20px;
    }
  }

  @media screen and (max-width: 768px) {
    & > svg {
      width: 24px;
      height: 24px;
    }
  }
`

const Fighters = styled.div`
  display: flex;
  flex-direction: column;
`

const Fighter = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 4px;
`

const FullName = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 120%;
  color: #f2f2f2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`

const Team = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 120%;
  color: #828282;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`

const Time = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #f2f2f2;
  border-left: 1px solid #1b1c22;
  padding-left: 16px;

  @media screen and (max-width: 768px) {
    font-size: 12px;
    line-height: 24px;
    padding-left: 8px;
  }
`

const Button = styled.button`
  height: min-content;
  background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
  border-radius: 16px;
  padding: 12px 20px;

  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;

  @media screen and (max-width: 768px) {
    font-size: 14px;
    line-height: 18px;
    padding: 8px 14px;
  }
`

const Winner = styled.button`
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  padding: 0 10px;
  color: #7a3fed;
`
