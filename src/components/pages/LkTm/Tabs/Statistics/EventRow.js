import React from 'react'
import DropdownData from '../../../../ui/DropdownData'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

function EventRow({ eventResults, isPublic, teamId }) {
  const { push: routerPush } = useRouter()
  const { t: tLkTm } = useTranslation('lkTm')

  const info = (
    <Info>
      <InfoItem color={'#828282'}>
        <p>{eventResults?.countParticipant || 0}</p>
        <div>{tLkTm('statistics.participant')}</div>
      </InfoItem>
      <InfoItem color={'#27AE60'}>
        <p>{eventResults?.wins || 0}</p>
        <div>{tLkTm('statistics.wins')}</div>
      </InfoItem>
      <InfoItem color={'#EB5757'}>
        <p>{eventResults?.defeats || 0}</p>
        <div>{tLkTm('statistics.defeats')}</div>
      </InfoItem>
      <InfoItem color={'#FFC107'}>
        <p>{eventResults?.placesCount?.gold || 0}</p>
        <div>{tLkTm('statistics.gold')}</div>
      </InfoItem>
      <InfoItem color={'#E0E0E0'}>
        <p>{eventResults?.placesCount?.silver || 0}</p>
        <div>{tLkTm('statistics.silver')}</div>
      </InfoItem>
      <InfoItem color={'#D7832D'}>
        <p>{eventResults?.placesCount?.bronze || 0}</p>
        <div>{tLkTm('statistics.bronze')}</div>
      </InfoItem>
    </Info>
  )

  return (
    <DropdownData
      heightWrapper={'212px'}
      title={eventResults?.eventName || ''}
      additionalData={info}
      onClickRedirect={async () =>
        await routerPush(
          isPublic && teamId
            ? `/team/${teamId}/statistics/${eventResults.id}/`
            : `/lk-tm/profile/statistics/${eventResults.id}/`,
        )
      }
    />
  )
}

export default EventRow

const Info = styled.div`
  display: grid;
  grid-template: 1fr / repeat(7, 1fr);
  padding: 32px 0;

  border-top: 1px solid #333;
`

const InfoItem = styled.div`
  justify-self: center;
  align-self: center;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${(p) => p.color};
  margin-right: 32px;
  &:last-child {
    margin: 0;
  }
  p {
    margin: 0;
  }
`
