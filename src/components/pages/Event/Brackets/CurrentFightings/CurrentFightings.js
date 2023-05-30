import React, { useEffect, useState } from 'react'
import {
  FightStatusBeReady,
  FightStatusGoToBullPen,
  FightStatusPlay,
} from '../../../../../assets/svg/icons'
import styled from 'styled-components'
import { theme } from '../../../../../styles/theme'
import { EventMatsClient } from '../../../../../services/apiClients/eventMatsClient'
import MatsWithFightings from './MatsWithFightings'
import useQuery from '../../../../../hooks/useQuery'
import { useRouter } from 'next/router'

const eventMatsClient = new EventMatsClient()

export default function CurrentFightings() {
  const {
    query: { id: eventId },
  } = useRouter()
  const query = useQuery()
  const [currentFightings, setCurrentFightings] = useState([])

  useEffect(() => {
    query.set('event_id', eventId)
    eventMatsClient.getCurrentFightings(query).then(({ data }) => setCurrentFightings(data))
  }, [query])

  return (
    <div>
      <InfoWrapper>
        <Info>
          <FightStatusPlay />
          <p>Currently fighting</p>
        </Info>
        <Info>
          <FightStatusBeReady />
          <p>Be ready in bull pen</p>
        </Info>
        <Info>
          <FightStatusGoToBullPen />
          <p>Go to bull pen</p>
        </Info>
      </InfoWrapper>
      <MatsOuterWrapper>
        {!!currentFightings?.results?.length &&
          currentFightings.results.map((curMat) => (
            <MatsWithFightings key={curMat?.id} matWithFightings={curMat} />
          ))}
      </MatsOuterWrapper>
    </div>
  )
}

const InfoWrapper = styled.div`
  display: flex;
  grid-gap: 32px;
  margin-bottom: 48px;

  ${theme.mqMax('md')} {
    flex-direction: column;
    grid-gap: 0;
  }
`

const Info = styled.div`
  display: flex;
  grid-gap: 32px;
  padding: 0 32px 0 0;
  border-right: 1px solid #333333;

  & > p {
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #ffffff;
    display: flex;
    align-items: center;
  }

  ${theme.mqMax('md')} {
    padding: 16px 8px;
    border-right: none;
    border-bottom: 1px solid #333333;
    grid-gap: 8px;
  }
  &:last-child {
    border: none;
  }
`

const MatsOuterWrapper = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 1fr;
  flex-wrap: wrap;

  ${theme.mqMin('md')} {
    display: grid;
    grid-gap: 32px;
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 1300px) {
    grid-template-columns: repeat(3, 1fr);
  }
`
