import React from 'react'
import DropdownData, { ArrowIcon } from '../../../../ui/DropdownData'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { theme } from '../../../../../styles/theme'

function EventRow({ eventResults, isPublic, teamId }) {
  const { push: routerPush } = useRouter()
  const { t: tLkTm } = useTranslation('lkTm')

  return (
    <EventRowWrapper>
      <TitlePart
        onClick={() =>
          routerPush(
            isPublic && teamId
              ? `/team/${teamId}/statistics/${eventResults.id}/`
              : `/lk-tm/profile/statistics/${eventResults.id}/`,
          )
        }
      >
        <Title>{eventResults?.eventName || ''}</Title>
        <ArrowIconCustom />
      </TitlePart>
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
    </EventRowWrapper>
  )
}

export default EventRow

const EventRowWrapper = styled.div`
  display: grid;
  grid-template: min-content 1fr / 1fr;
  grid-gap: 20px;

  border: 1px solid #333;
  background: #191a1f;
  border-radius: 16px;
  padding: 20px;

  ${theme.mqMax('xl')} {
    grid-gap: 16px;
    padding: 16px;
  }
`

const TitlePart = styled.div`
  display: grid;
  grid-template: 1fr / auto 32px;
  grid-gap: 10px;
  border-bottom: 1px solid #333;
  padding-bottom: 20px;
  cursor: pointer;

  align-items: center;

  ${theme.mqMax('xl')} {
    padding-bottom: 16px;
  }
`

const Title = styled.h3`
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  color: #f2f2f2;
`

const ArrowIconCustom = styled(ArrowIcon)`
  transform: rotate(270deg);
`

const Info = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-row-gap: 16px;
`

const InfoItem = styled.div`
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
