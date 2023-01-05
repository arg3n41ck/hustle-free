import { useTranslation } from 'next-i18next'
import React from 'react'
import styled from 'styled-components'

function StoryCollapse({ fightsHistory }) {
  const { t: tLkAh } = useTranslation('lkAh')

  return (
    <ParticipantInfoSummary>
      {!!fightsHistory?.length &&
        fightsHistory.map(({ opponent, result }) => {
          const bgColor = !!result ? 'rgba(39,174,96,0.15)' : 'rgba(235,87,87,0.15)'
          const color = !!result ? '#27ae60' : '#EB5757'
          return (
            <ParticipantInfoSummaryField>
              <ParticipantInfoSummaryFieldCol1>
                <ParticipantInfoSummaryFieldCol1Text color={color}>
                  {!!result ? tLkAh('won') : tLkAh('lost')}
                </ParticipantInfoSummaryFieldCol1Text>
              </ParticipantInfoSummaryFieldCol1>
              <ParticipantInfoSummaryFieldCol2 background={bgColor}>
                <ParticipantInfoSummaryFieldCol2Text>
                  {opponent}
                </ParticipantInfoSummaryFieldCol2Text>
              </ParticipantInfoSummaryFieldCol2>
            </ParticipantInfoSummaryField>
          )
        })}
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

  border-bottom: #333;

  &:last-child {
    border: none;
  }
`

const ParticipantInfoSummary = styled.div`
  width: 100%;
  border: 1px solid #333333;
  border-radius: 8px;
  margin: 32px 0;
  overflow: hidden;
`

const ParticipantInfoSummaryField = styled.div`
  height: 56px;
  display: flex;
  align-items: center;

  border-bottom: 1px solid #333333;
  overflow: hidden;

  &:last-child {
    border: none;
  }

  @media screen and (max-width: 992px) {
    height: unset;
    align-items: flex-start;
    flex-direction: column;
  }
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
  color: #f2f2f2;

  display: flex;
  align-items: center;
  grid-gap: 10px;
`
