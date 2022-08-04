import React from 'react'
import EventMainInfo from './EventMainInfo'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'

function Event({ event }) {
  const { t: tEventDetail } = useTranslation('eventDetail')

  return (
    <MainWrapper>
      <EventMainInfo event={event} />
      <Title>{tEventDetail('event.eventDescription')}</Title>
      <Columns>
        <Column>{event?.description?.description}</Column>
        <Column>
          <h4 />
          <p />
        </Column>
      </Columns>
    </MainWrapper>
  )
}

export { Event }

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 32px;
`

const Columns = styled.div`
  display: grid;
  grid-template: 1fr / 2fr 1fr;
  grid-column-gap: 32px;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;

  border-right: 1px solid #333;

  &:first-child {
    padding: 0 32px 0 0;
  }

  &:last-child {
    border-right: none;
    grid-gap: 24px;

    p {
      font-weight: 400;
      font-size: 20px;
      line-height: 32px;
      color: #828282;
    }
  }

  h3 {
    font-weight: 600;
    font-size: 20px;
    line-height: 32px;
    color: #f2f2f2;
  }
`

const Title = styled.h3`
  font-weight: 600;
  font-size: 24px;
  color: #f2f2f2;
`
