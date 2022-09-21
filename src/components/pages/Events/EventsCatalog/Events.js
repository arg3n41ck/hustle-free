import React from 'react'
import { useSelector } from 'react-redux'
import { selectEvents } from '../../../../redux/components/events'
import styled from 'styled-components'
import EventsArray from '../../../ui/Events'
import { useTranslation } from 'next-i18next'

function Events() {
  const [, events] = useSelector(selectEvents)
  const { t: tEvents } = useTranslation('events')

  return (
    <EventsWrapper>
      <HeadPart>
        <MainPageTitle>{tEvents('events.events')}</MainPageTitle>
      </HeadPart>

      <EventsArray data={events} />
    </EventsWrapper>
  )
}

export default Events

const EventsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 32px;
  margin-top: 32px;
`

const HeadPart = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 32px;
`

const MainPageTitle = styled.h2`
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #ffffff;
  margin: 0 auto 0 0;
`
