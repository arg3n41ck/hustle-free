import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import EventMainInfoContacts from './EventMainInfoContacts'
import EventMainInfoLocation from './EventMainInfoLocation'
import EventMainInfoPC from './EventMainInfoPC'
import ULAccordion from '../../../ui/ULAccordion'
import { theme } from '../../../../styles/theme'
import { useMediaQuery } from '@mui/material'
import EventMainInfoShare from './EventMainInfoShare'

function EventMainInfo({ event }) {
  const { t: tEventDetail } = useTranslation('eventDetail')
  const xl = useMediaQuery('(max-width: 1119px)')

  return (
    <MainWrapper>
      <Column>
        {!xl ? (
          <EventMainInfoContacts event={event} />
        ) : (
          <ULAccordion defaultExpanded={false} title={tEventDetail('eventMainInfo.contacts')}>
            <EventMainInfoContacts event={event} />
          </ULAccordion>
        )}
      </Column>

      <Column>
        {!xl ? (
          <EventMainInfoLocation event={event} />
        ) : (
          <ULAccordion defaultExpanded={false} title={tEventDetail('eventMainInfo.location')}>
            <EventMainInfoLocation event={event} />
          </ULAccordion>
        )}
      </Column>

      <Column listWrapped>
        {!xl ? (
          <EventMainInfoPC event={event} />
        ) : (
          <>
            <ULAccordion
              defaultExpanded={false}
              title={tEventDetail('eventMainInfo.participantsCategories')}
            >
              <EventMainInfoPC event={event} />{' '}
            </ULAccordion>
            <EventMainInfoShare event={event} />
          </>
        )}
      </Column>
    </MainWrapper>
  )
}

export default EventMainInfo

const MainWrapper = styled.div`
  display: grid;
  grid-template: 1fr / repeat(3, 1fr);
  grid-gap: 16px;
  padding: 0 0 32px 0;
  border-bottom: 1px solid #333;

  ${theme.mqMax('xl')} {
    grid-template: repeat(3, auto) / 1fr;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 24px;
  border-right: 1px solid #333;
  padding: 0 16px 0 0;

  &:last-child {
    border-right: none;
    padding: 0;
  }

  ${theme.mqMax('xl')} {
    border: none;
    padding: 0;
  }

  h3 {
    font-weight: 600;
    font-size: 24px;
    color: #f2f2f2;

    &.hide-on-mob {
      ${theme.mqMax('xl')} {
        display: none;
      }
    }
  }

  ul {
    display: grid;
    ${({ listWrapped }) => {
      return !listWrapped
        ? 'grid-template-columns: 1fr; grid-auto-rows: auto;'
        : 'grid-template: 1fr 1fr 1fr / 1fr 1fr;'
    }}
    grid-row-gap: 24px;

    li {
      display: flex;
      grid-column-gap: 10px;

      div {
        display: flex;
        flex-direction: column;
        grid-gap: 12px;
        span {
          font-size: 18px;
          color: #bdbdbd;
        }
        p {
          font-size: 18px;
          line-height: 24px;
          color: #f2f2f2;
        }
      }
    }
  }
`
