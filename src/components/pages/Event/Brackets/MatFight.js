import React, { useMemo } from 'react'
import {
  FightStatusBeReady,
  FightStatusGoToBullPen,
  FightStatusInProgress,
} from '../../../../assets/svg/icons'
import { getFormattedStartTime } from './bracketsUtils'
import styled from 'styled-components'
import { useRouter } from 'next/router'

export default function MatFight({ fight, bracketId }) {
  const {
    push: routerPush,
    query: { id: eventId },
  } = useRouter()
  const { category, status, fightNumber, prefix, fighters, fightStartTime } = fight

  const statusIcon = useMemo(() => {
    switch (status) {
      case 'ongoing':
        return <FightStatusInProgress />
      case 'beready':
        return <FightStatusBeReady />
      default:
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
                </Fighter>
              ))}
          </Fighters>
        </Details>
      </FightingContent>
      {fightStartTime && <Time>{getFormattedStartTime(fightStartTime)}</Time>}
      <ActionsWrapper>
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
  grid-gap: 32px;
  padding: 16px;
`

const FightingWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template: 1fr / auto 72px;
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
  border-right: 1px solid #1b1c22;
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
  overflow: 'hidden';
  text-overflow: 'ellipsis';
  white-space: 'nowrap';
`

const Team = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 120%;
  color: #828282;
  overflow: 'hidden';
  text-overflow: 'ellipsis';
  white-space: 'nowrap';
`

const Time = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #f2f2f2;
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
`
