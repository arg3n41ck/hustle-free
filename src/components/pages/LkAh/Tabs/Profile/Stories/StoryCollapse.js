import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { PlaceIcon } from './FilterMyStories'

function StoryCollapse({ place, placeDescribe }) {
  const { t: tLkAh } = useTranslation('lkAh')

  const { placeText, color } = useMemo(() => {
    if (place && place <= 3) {
      const placeText =
        +place === 1 ? tLkAh('gold') : +place === 2 ? tLkAh('silver') : tLkAh('bronze')
      const color = +place === 1 ? '#FFC107' : +place === 2 ? '#f2f2f2' : '#9B5711'
      return {
        placeText,
        color,
      }
    }
    return {
      placeText: `${place} место`,
      color: '#f2f2f2',
    }
  }, [place])

  return (
    <ParticipantInfoSummary>
      <ParticipantInfoSummaryField>
        <ParticipantInfoSummaryFieldCol1>
          <ParticipantInfoSummaryFieldCol1Text color={'#27ae60'}>
            {tLkAh('won')}
          </ParticipantInfoSummaryFieldCol1Text>
        </ParticipantInfoSummaryFieldCol1>
        <ParticipantInfoSummaryFieldCol2 background={'rgba(39, 174, 96, 0.15)'}>
          <ParticipantInfoSummaryFieldCol2Text color={'#F2F2F2'}>
            {placeDescribe?.wonAgainst || ''}
          </ParticipantInfoSummaryFieldCol2Text>
        </ParticipantInfoSummaryFieldCol2>
      </ParticipantInfoSummaryField>
      <Line />
      <ParticipantInfoSummaryField>
        <ParticipantInfoSummaryFieldCol1>
          <ParticipantInfoSummaryFieldCol1Text color={'#EB5757'}>
            {tLkAh('lost')}
          </ParticipantInfoSummaryFieldCol1Text>
        </ParticipantInfoSummaryFieldCol1>
        <ParticipantInfoSummaryFieldCol2 background={'rgba(235, 87, 87, 0.15)'}>
          <ParticipantInfoSummaryFieldCol2Text color={'#F2F2F2'}>
            {placeDescribe?.lostTo || ''}
          </ParticipantInfoSummaryFieldCol2Text>
        </ParticipantInfoSummaryFieldCol2>{' '}
      </ParticipantInfoSummaryField>
      <Line />
      <ParticipantInfoSummaryField>
        <ParticipantInfoSummaryFieldCol1>
          <ParticipantInfoSummaryFieldCol1Text color={color}>
            {tLkAh('outcome')}
          </ParticipantInfoSummaryFieldCol1Text>
        </ParticipantInfoSummaryFieldCol1>
        <ParticipantInfoSummaryFieldCol2 background={'rgba(255, 255, 255, 0.1)'}>
          <ParticipantInfoSummaryFieldCol2Text color={color}>
            {place > 0 && place <= 3 && <PlaceIcon place={place} size={32} />}
            {placeText}
          </ParticipantInfoSummaryFieldCol2Text>
        </ParticipantInfoSummaryFieldCol2>
      </ParticipantInfoSummaryField>
    </ParticipantInfoSummary>
  )
}

export default StoryCollapse

const ParticipantInfoSummaryFieldCol1Text = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: ${({ color }) => color};
`

const ParticipantInfoSummary = styled.div`
  width: 100%;
  border: 1px solid #333333;
  border-radius: 8px;
  margin: 32px 0;
`

const ParticipantInfoSummaryField = styled.div`
  height: 56px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 992px) {
    height: unset;
    align-items: flex-start;
    flex-direction: column;
  }
`

const Line = styled.div`
  border: 1px solid #333333;
  width: 100%;
`

const ParticipantInfoSummaryFieldCol1 = styled.div`
  background: #1b1c22;
  max-width: 208px;
  width: 100%;
  padding: 16px;
`

const ParticipantInfoSummaryFieldCol2 = styled.div`
  background: ${({ background }) => background};
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  padding: 16px;
  grid-template-columns: 1fr;

  @media screen and (max-width: 756px) {
    grid-template: 1fr/ 1fr;
    grid-gap: 10px;
  }
`

const ParticipantInfoSummaryFieldCol2Text = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: ${({ color }) => color};

  display: flex;
  align-items: center;
  grid-gap: 10px;
`
