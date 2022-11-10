import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import EventMainInfoShare from './EventMainInfoShare'
import { useMediaQuery } from '@mui/material'
import { theme } from '../../../../styles/theme'

const getParticipantCategories = (event) => {
  const minPrice = event?.eventParticipantsCategory?.length
    ? event.eventParticipantsCategory.reduce(
        (prev, cur) => {
          const curEarlyPrice = Math.round(
            +cur?.price?.earlyPrice || +cur?.price?.standartPrice || +cur?.price?.latePrice,
          )
          return {
            price: prev?.price == 0 || +prev?.price > curEarlyPrice ? curEarlyPrice : prev?.price,
            currency:
              prev?.price == 0 || +prev?.price > curEarlyPrice
                ? cur?.price?.currency
                : prev?.currency,
          }
        },
        { price: 0, currency: '' },
      )
    : { price: 0, currency: '' }

  return [
    {
      id: 'getParticipantCategories_1',
      label: `eventMainInfo.categories`,
      value: event?.categoryAmount || 0,
    },
    {
      id: 'getParticipantCategories_2',
      label: `eventMainInfo.levels`,
      value: event?.levelAmount || 0,
    },
    {
      id: 'getParticipantCategories_3',
      label: `eventMainInfo.gender`,
      value: event?.getGender || '',
    },
    {
      id: 'getParticipantCategories_4',
      label: `eventMainInfo.age`,
      value: event?.averageAge
        ? `${event?.averageAge?.minAge || 0}${
            event?.averageAge?.maxAge ? ' - ' + event?.averageAge?.maxAge : ''
          }`
        : '',
    },
    {
      id: 'getParticipantCategories_5',
      label: `eventMainInfo.weight`,
      value: event?.averageWeight
        ? `${event?.averageWeight?.minWeight || 0} кг${
            event?.averageWeight?.maxWeight ? ' - ' + event?.averageWeight?.maxWeight + ' кг' : ''
          }`
        : '',
    },
    {
      id: 'getParticipantCategories_6',
      label: `eventMainInfo.price`,
      value: `от ${minPrice?.price} ${(minPrice?.currency || '').toUpperCase()}`,
    },
  ]
}

function EventMainInfoPC({ event }) {
  const [categories, setCategories] = useState([])
  const xl = useMediaQuery('(max-width: 1119px)')
  const { t: tEventDetail } = useTranslation('eventDetail')
  useEffect(() => {
    event?.id && setCategories(getParticipantCategories(event))
  }, [event])
  return (
    <EMWrapper>
      <h3 className='hide-on-mob'>{tEventDetail('eventMainInfo.participantsCategories')}</h3>

      <ul>
        {!!categories?.length &&
          categories.map(({ id, label, value, icon }) => (
            <li key={`EventMainInfoContacts_${id}`}>
              {icon}
              <div>
                <span>{tEventDetail(label)}</span>
                <p>{value}</p>
              </div>
            </li>
          ))}
      </ul>

      {!xl && <EventMainInfoShare event={event} />}

      {!!event?.qrCode && (
        <ExtraWrapper>
          <QRTitle>Ваш QR-Код:</QRTitle>
          <QrImageWrapper>
            <Qr
              target='_blank'
              rel='noreferrer noopener'
              bg={event?.qrCode}
              href={event?.qrCode}
              role='link'
              aria-disabled='false'
            />
            <QrDownloadLink rel='nofollow' download='' target='_blank' href={event?.qrCode}>
              {qrIcon} Скачать QR код
            </QrDownloadLink>
          </QrImageWrapper>
        </ExtraWrapper>
      )}
    </EMWrapper>
  )
}

export default EventMainInfoPC

const EMWrapper = styled.div`
  padding: 0 8px 16px;

  ${theme.mqMax('xl')} {
    background: #141519;
    padding: 16px 8px !important;
  }

  h3 {
    margin-bottom: 23px;
  }
`

const ExtraWrapper = styled.div`
  padding: 16px 8px 8px;
`

const QRTitle = styled.h3`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
  margin: 0 0 24px 0;
`

const QrImageWrapper = styled.div`
  display: flex;
  align-items: center;
  grid-column-gap: 16px;
`

const QrDownloadLink = styled.a`
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #6d4eea;

  display: flex;
  align-items: center;
  grid-gap: 8px;
`

const Qr = styled.a`
  width: 104px;
  height: 104px;
  background: no-repeat url('${({ bg }) => bg}') center / cover;
  border-radius: 8px;
`

const qrIcon = (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M12 5L11.2929 4.29289L12 3.58579L12.7071 4.29289L12 5ZM13 14C13 14.5523 12.5523 15 12 15C11.4477 15 11 14.5523 11 14L13 14ZM6.29289 9.29289L11.2929 4.29289L12.7071 5.70711L7.70711 10.7071L6.29289 9.29289ZM12.7071 4.29289L17.7071 9.29289L16.2929 10.7071L11.2929 5.70711L12.7071 4.29289ZM13 5L13 14L11 14L11 5L13 5Z'
      fill='#6D4EEA'
    />
    <path
      d='M7 19L7 18H7V19ZM17 19V20V19ZM7 20L17 20V18L7 18L7 20ZM6 17V16H4V17H6ZM20 17V16H18V17H20ZM17 20C18.6569 20 20 18.6569 20 17H18C18 17.5523 17.5523 18 17 18V20ZM7 18C6.44772 18 6 17.5523 6 17H4C4 18.6569 5.34315 20 7 20V18Z'
      fill='#6D4EEA'
    />
  </svg>
)
