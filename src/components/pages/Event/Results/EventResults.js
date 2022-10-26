import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import HorizontalTabsBorder from '../../../ui/tabs/HorizontalTabsBorder'
import { GoldMedalIcon } from '../../../../assets/svg/icons'
import { SilverMedalIcon } from '../../../../assets/svg/icons'
import { BronzeMedalIcon } from '../../../../assets/svg/icons'
import Teams from './Teams'
import Participants from './Participants'
import { useTranslation } from 'next-i18next'
import { theme } from '../../../../styles/theme'

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
            <MedalText color={'#FFC107'}>{first || 0}</MedalText>
          </MedalInfo>
        </Medal>
        <MedalBorder />
        <Medal>
          <SilverMedalIcon />
          <MedalInfo>
            <MedalText color={'#E0E0E0'}>
              {tEventDetail('event.results.eventResults.silver')}:
            </MedalText>
            <MedalText color={'#E0E0E0'}>{second || 0}</MedalText>
          </MedalInfo>
        </Medal>
        <MedalBorder />
        <Medal>
          <BronzeMedalIcon />
          <MedalInfo>
            <MedalText color={'#D7832D'}>
              {tEventDetail('event.results.eventResults.bronze')}:
            </MedalText>
            <MedalText color={'#D7832D'}>{third || 0}</MedalText>
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
  }
`

const MedalBorder = styled.div`
  width: 0;
  height: 100%;
  border-right: 1px solid #333333;
`

export default EventResults
