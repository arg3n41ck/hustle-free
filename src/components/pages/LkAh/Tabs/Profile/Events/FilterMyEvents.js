import React from 'react'
import styled from 'styled-components'
import { getRusBetweenDate } from '../../../../../../helpers/helpers'
import { CalendarIcon, LocationIcon } from '../../../../Events/EventsSlider'
import { Avatar, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/router'

function FilterMyEvents({ data }) {
  const { push: routerPush } = useRouter()
  const md = useMediaQuery('(max-width: 768px)')

  return (
    <EventContainer key={data?.id}>
      <EventItems>
        <Avatar
          alt={data?.event?.description?.banner}
          src={data?.event?.description?.banner}
          sx={{
            width: md ? '100%' : 112,
            height: md ? 176 : 112,
            borderRadius: md ? '4px' : '50%',
          }}
        />
        <EventsInfo>
          <EventInfoHeadingText onClick={() => routerPush(`/events/${data?.event?.id}`)}>
            {data?.event?.name}
          </EventInfoHeadingText>
          <EventInfoParticipantsInfo>
            {data?.participationCategory?.eventParticipantsCategory?.name} /{' '}
            {data?.participationCategory?.level?.name} /{' '}
            {data?.participationCategory?.eventParticipantsCategory?.fromAge}-
            {data?.participationCategory?.eventParticipantsCategory?.toAge} лет /{' '}
            {data?.participationCategory?.eventParticipantsCategory?.fromWeight} кг -{' '}
            {data?.participationCategory?.eventParticipantsCategory?.toWeight} кг{' '}
          </EventInfoParticipantsInfo>
          <EventBottomInfo>
            <LocationIcon color={'#828282'} />
            <EventCitiesAndDateInfo>
              {data?.event?.location?.country}, {data?.event?.location?.city}
            </EventCitiesAndDateInfo>
          </EventBottomInfo>
          <EventBottomInfo>
            <CalendarIcon color={'#828282'} />
            <EventCitiesAndDateInfo>
              {getRusBetweenDate(data?.event?.dateStart, data?.event?.dateEnd)}
            </EventCitiesAndDateInfo>
          </EventBottomInfo>
        </EventsInfo>

        <EventRightInfo>
          <PaidInfo color={data?.isPaid ? '#27AE60' : '#828282'}>
            {data?.isPaid ? 'Оплачено' : 'Не оплачено'}
          </PaidInfo>
        </EventRightInfo>
      </EventItems>
    </EventContainer>
  )
}

// #27AE60 #EB5757

export default FilterMyEvents

const EventContainer = styled.div`
  width: 100%;
  padding: 32px;
  border-left: 1px solid #333333;
  border-right: 1px solid #333333;
  border-bottom: 1px solid #333333;

  &:last-child {
    border-radius: 0 0 24px 24px;
  }

  @media screen and (max-width: 768px) {
    padding: 16px;
    border-left: none;
    border-right: none;
  }
`

const EventRightInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  height: 100%;

  @media screen and (max-width: 768px) {
    margin-top: -12px;
  }
`

const PaidInfo = styled.p`
  width: fit-content;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${({ color }) => color};
`

const EventItems = styled.div`
  display: grid;
  grid-template-columns: 112px auto auto;
  grid-column-gap: 32px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
const EventsInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-gap: 16px;

  @media screen and (max-width: 768px) {
    margin-top: 10px;
  }
`

const EventBottomInfo = styled.div`
  max-width: 300px;
  width: 100%;
  display: grid;
  grid-template-columns: 1.5fr 10fr;
  align-items: center;
`

const EventCitiesAndDateInfo = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #f2f2f2;
`

const EventInfoHeadingText = styled.h2`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  cursor: pointer;
  color: #f2f2f2;

  &:hover {
    text-decoration: underline;
  }
`

const EventInfoParticipantsInfo = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  color: #f2f2f2;
`

export const ManyEllipseIcon = () => (
  <svg width='6' height='32' viewBox='0 0 6 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <circle cx='3' cy='3' r='3' fill='#333333' />
    <circle cx='3' cy='16' r='3' fill='#333333' />
    <circle cx='3' cy='29' r='3' fill='#333333' />
  </svg>
)
