import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import HorizontalTabsBorder from '../../../ui/tabs/HorizontalTabsBorder'
import { GoldMedalIcon } from '../../../../assets/svg/icons'
import { SilverMedalIcon } from '../../../../assets/svg/icons'
import { BronzeMedalIcon } from '../../../../assets/svg/icons'
import Teams from './Teams'
import Participants from './Participants'
import { useTranslation } from 'next-i18next'
import { theme } from '../../../../styles/theme'
import $api from '../../../../services/axios'
import { useRouter } from 'next/router'

const getEventPlaces = async (eventId) => {
  try {
    const { data } = await $api.get(`/events/events/${eventId}/stats/`)
    return data
  } catch (error) {
    console.log(error)
  }
}

const EventResults = () => {
  const [view, setView] = useState('participants') // participants | teams
  const [resultsPlaces, setResultsPlaces] = useState(null)
  const { t: tEventDetail } = useTranslation('eventDetail')
  const {
    query: { id: eventId },
  } = useRouter()

  const tabs = [
    {
      name: tEventDetail('event.results.eventResults.participants'),
      value: 'participants',
    },
    {
      name: tEventDetail('event.results.eventResults.teams'),
      value: 'teams',
    },
  ]

  useEffect(() => {
    getEventPlaces(eventId).then(setResultsPlaces)
  }, [])

  return (
    <>
      <MedalsTitle>
        {tEventDetail('event.results.eventResults.totalFights')}: {resultsPlaces?.fightsCount || 0}
      </MedalsTitle>
      <Medals>
        <Medal>
          <GoldMedalIcon />
          <MedalInfo>
            <MedalText color={'#FFC107'}>
              {tEventDetail('event.results.eventResults.gold')}:
            </MedalText>
            <MedalText color={'#FFC107'}>{resultsPlaces?.goldCount || 0}</MedalText>
          </MedalInfo>
        </Medal>
        <MedalBorder />
        <Medal>
          <SilverMedalIcon />
          <MedalInfo>
            <MedalText color={'#E0E0E0'}>
              {tEventDetail('event.results.eventResults.silver')}:
            </MedalText>
            <MedalText color={'#E0E0E0'}>{resultsPlaces?.silverCount || 0}</MedalText>
          </MedalInfo>
        </Medal>
        <MedalBorder />
        <Medal>
          <BronzeMedalIcon />
          <MedalInfo>
            <MedalText color={'#D7832D'}>
              {tEventDetail('event.results.eventResults.bronze')}:
            </MedalText>
            <MedalText color={'#D7832D'}>{resultsPlaces?.bronzeCount || 0}</MedalText>
          </MedalInfo>
        </Medal>
      </Medals>
      <HorizontalTabsBorder
        arrayTab={tabs}
        valueTab={view}
        onChangeHandler={setView}
        height={'96px'}
      >
        {view === 'participants' ? <Participants /> : <Teams />}
      </HorizontalTabsBorder>
    </>
  )
}

const Medals = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  grid-gap: 16px;
  margin-bottom: 48px;
  justify-items: center;
  ${theme.mqMax('md')} {
    grid-gap: 5px;
  }
`
const Medal = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 32px;

  ${theme.mqMax('md')} {
    flex-direction: column;

    & svg {
      width: 88px;
      height: 88px;
    }
  }
`

const MedalsTitle = styled.h3`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
  margin-bottom: 32px;
`

const MedalInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const MedalText = styled.p`
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  text-transform: uppercase;
  line-height: 32px;
  color: ${(p) => p.color};
  &:last-child {
    font-weight: 900;
    font-size: 32px;
    line-height: 40px;
  }

  ${theme.mqMax('md')} {
    text-align: center;
    font-size: 16px;
    line-height: 24px;
  }
`

const MedalBorder = styled.div`
  width: 0;
  height: 100%;
  border-right: 1px solid #333333;
`

export default EventResults
