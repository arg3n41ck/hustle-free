import { useTranslation } from 'next-i18next'
import React from 'react'
import styled from 'styled-components'

function StoryCollapse({ fightsHistory }) {
  const { t: tLkAh } = useTranslation('lkAh')

  return (
    <ParticipantInfoSummary>
      {!!fightsHistory?.length &&
        fightsHistory.map(({ opponent, result }) => {
          const bgColor = !!result ? 'rgba(39, 174, 96, 0.15)' : 'rgba(235, 87, 87, 0.15)'
          const color = !!result ? '#27ae60' : '#EB5757'
          return (
            <ParticipantInfoSummaryField background={bgColor}>
              <ParticipantInfoSummaryFieldCol1Text color={color}>
                {!!result ? tLkAh('won') : tLkAh('lost')}
              </ParticipantInfoSummaryFieldCol1Text>
              <ParticipantInfoSummaryFieldCol2Text>{opponent}</ParticipantInfoSummaryFieldCol2Text>
            </ParticipantInfoSummaryField>
          )
        })}
    </ParticipantInfoSummary>
  )
}

export default StoryCollapse

const ParticipantInfoSummaryFieldCol1Text = styled.div`
  color: ${({ color }) => color};

  border-bottom: #333;

  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;

  &:last-child {
    border: none;
  }

  @media screen and (min-width: 992px) {
    height: calc(100% + 16px);
    width: calc(100% + 18px);
    min-width: 120px;
    display: flex;
    align-items: center;
    margin: -8px 0 -8px -18px;
    padding: 16px;
    background: #1b1c22;
  }
`

const ParticipantInfoSummary = styled.div`
  width: 100%;
  border: 1px solid #333333;
  border-radius: 8px;
  overflow: hidden;
`

const ParticipantInfoSummaryField = styled.div`
  height: 56px;

  display: grid;
  grid-template: 1fr / 0.5fr 2fr;
  grid-gap: 32px;
  align-items: center;
  padding: 8px 18px;

  background: ${({ background }) => background};

  border-bottom: 1px solid #333333;
  overflow: hidden;

  &:last-child {
    border: none;
  }

  @media screen and (max-width: 992px) {
    height: unset;
    grid-gap: 10px;
    grid-template: 1fr 1fr / 1fr;
    grid-gap: 4px;
  }
`

const ParticipantInfoSummaryFieldCol2Text = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #f2f2f2;

  display: flex;
  align-items: center;
  grid-gap: 10px;
`
