import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import HorizontalTabsBorder from '../../../ui/tabs/HorizontalTabsBorder'
import { GoldMedalIcon } from '../../../../assets/svg/icons'
import { SilverMedalIcon } from '../../../../assets/svg/icons'
import { BronzeMedalIcon } from '../../../../assets/svg/icons'
import Teams from './Teams'
import Participants from './Participants'
import { useTranslation } from 'next-i18next'

const EventResults = () => {
  const [view, setView] = useState('participants') // participants | teams
  const [resultsPlaces, setResultsPlaces] = useState([])
  const { t: tEventDetail } = useTranslation('eventDetail')

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

  const onloadPC = (data) => {
    data.length && setResultsPlaces(data.map((item) => item.participants).flat(Infinity))
  }

  const { first, second, third, all } = useMemo(() => {
    const firstP =
      !!resultsPlaces.length && (resultsPlaces.filter(({ place }) => place === 1).length || '0')
    const secondP =
      !!resultsPlaces.length && (resultsPlaces.filter(({ place }) => place === 2).length || '0')
    const thirdP =
      !!resultsPlaces.length && (resultsPlaces.filter(({ place }) => place === 3).length || '0')

    const allP =
      !!resultsPlaces.length && (resultsPlaces.filter(({ place }) => place).length || '-')
    return { first: firstP, second: secondP, third: thirdP, all: allP }
  }, [resultsPlaces])

  return (
    <>
      <MedalsTitle>
        {tEventDetail('event.results.eventResults.totalFights')}: {all}
      </MedalsTitle>
      <Medals>
        <Medal>
          <GoldMedalIcon />
          <MedalInfo>
            <MedalText color={'#FFC107'}>
              {tEventDetail('event.results.eventResults.gold')}:
            </MedalText>
            <MedalText color={'#FFC107'}>{first}</MedalText>
          </MedalInfo>
        </Medal>
        <Medal>
          <SilverMedalIcon />
          <MedalInfo>
            <MedalText color={'#E0E0E0'}>
              {tEventDetail('event.results.eventResults.silver')}:
            </MedalText>
            <MedalText color={'#E0E0E0'}>{second}</MedalText>
          </MedalInfo>
        </Medal>
        <Medal>
          <BronzeMedalIcon />
          <MedalInfo>
            <MedalText color={'#D7832D'}>
              {tEventDetail('event.results.eventResults.bronze')}:
            </MedalText>
            <MedalText color={'#D7832D'}>{third}</MedalText>
          </MedalInfo>
        </Medal>
      </Medals>
      <HorizontalTabsBorder
        arrayTab={tabs}
        valueTab={view}
        onChangeHandler={setView}
        height={'96px'}
      >
        {view === 'participants' ? <Participants onloadPC={onloadPC} /> : <Teams />}
      </HorizontalTabsBorder>
    </>
  )
}

const Medals = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 48px;
`
const MedalsTitle = styled.h3`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
  margin-bottom: 32px;
`
const Medal = styled.div`
  display: flex;
  padding: 0 16px;
  &:nth-child(2) {
    border-left: 1px solid #333333;
    border-right: 1px solid #333333;
  }
`
const MedalInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 32px;
`
const MedalText = styled.p`
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  line-height: 32px;
  color: ${(p) => p.color};
`

export default EventResults
