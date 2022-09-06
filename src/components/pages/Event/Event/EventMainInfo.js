import React, { useEffect, useMemo, useState } from 'react'
import {
  EventEmail,
  EventFacebook,
  EventFacebookHover,
  EventFlag,
  EventGoogleHover,
  EventLinkedin,
  EventLinkHover,
  EventLocation,
  EventMass,
  EventOrganisation,
  EventOrganizer,
  EventPhone,
  EventTGHover,
  EventVK,
  EventVKHover,
} from './EventIcons'
import styled from 'styled-components'
import { phoneFormatter } from '../../../../helpers/phoneFormatter'
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  VKShareButton,
} from 'react-share'
import { toast } from 'react-toastify'
import dynamic from 'next/dynamic'
import { getEventPC } from '../Categories/EventCategories'
import { useTranslation } from 'next-i18next'
const MapFiledLeafLet = dynamic(() => import('../../../ui/Map/FieldLeaflet'), {
  ssr: false,
})

const getContacts = (event) => {
  const { contacts } = event

  return [
    {
      id: 'orgName_1',
      label: `eventMainInfo.nameOfTheOrganization`,
      value: contacts?.nameOrganization || '',
      icon: <EventOrganisation />,
    },
    {
      id: 'organizer_2',
      label: `eventMainInfo.organizer`,
      value: `${contacts?.firstName || ''} ${contacts?.lastName || ''}`,
      icon: <EventOrganizer />,
    },
    {
      id: 'email_3',
      label: `eventMainInfo.email`,
      value: contacts?.email || '',
      icon: <EventEmail />,
    },
    {
      id: 'phone_4',
      label: `eventMainInfo.phoneNumber`,
      value: contacts?.phoneNumber1 ? phoneFormatter(contacts?.phoneNumber1) : '',
      icon: <EventPhone />,
    },
  ]
}

const getAddresses = (event) => {
  const { location } = event

  return [
    {
      id: 'getAddresses_1',
      label: 'eventMainInfo.addressOfTheEvent',
      value: location?.address || '',
      icon: <EventLocation />,
    },
    {
      id: 'getAddresses_2',
      label: 'eventMainInfo.weighingAddress',
      value: location?.weighingPlace || '',
      icon: <EventMass />,
    },
    {
      id: 'getAddresses_3',
      label: 'eventMainInfo.arenaName',
      value: location?.placeName || '',
      icon: <EventFlag />,
    },
  ]
}

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

function EventMainInfo({ event }) {
  const { t: tEventDetail } = useTranslation('eventDetail')
  const [categories, setCategories] = useState([])
  const { contacts, addresses } = useMemo(() => {
    return {
      contacts: getContacts(event),
      addresses: getAddresses(event),
    }
  }, [event])

  useEffect(() => {
    event?.id && setCategories(getParticipantCategories(event))
  }, [event])

  const copyUrl = (url) => {
    navigator.clipboard?.writeText(url)
    toast.success(`${tEventDetail('eventMainInfo.linkCopied')}`)
  }

  const mapPoints =
    event?.location?.lat && event?.location?.long
      ? {
          lat: +event?.location?.lat,
          lng: +event?.location?.long,
        }
      : null

  return (
    <MainWrapper>
      <Column>
        <h3>{tEventDetail('eventMainInfo.contacts')}</h3>
        <ul>
          {contacts.map(({ id, label, value, icon }) => (
            <li key={`EventMainInfoContacts_${id}`}>
              {icon}
              <div>
                <span>{tEventDetail(label)}</span>
                <p>{value}</p>
              </div>
            </li>
          ))}
        </ul>
        <h3>{tEventDetail('eventMainInfo.socialNetworks')}</h3>
        <ContactsSocials>
          {event?.contacts?.facebook && (
            <a href={event?.contacts?.facebook} rel='noreferrer noopener' target='_blank'>
              <EventFacebook />
            </a>
          )}
          {event?.contacts?.linkedin && (
            <a href={event?.contacts?.linkedin} rel='noreferrer noopener' target='_blank'>
              <EventLinkedin />
            </a>
          )}
          {event?.contacts?.vk && (
            <a href={event?.contacts?.vk} rel='noreferrer noopener' target='_blank'>
              <EventVK />
            </a>
          )}
        </ContactsSocials>
      </Column>

      <Column>
        <h3>{tEventDetail('eventMainInfo.location')}</h3>
        <ul>
          {addresses.map(({ id, label, value, icon }) => (
            <li key={`EventMainInfoContacts_${id}`}>
              {icon}
              <div>
                <span>{tEventDetail(label)}</span>
                <p>{value}</p>
              </div>
            </li>
          ))}
        </ul>
        <div />
        <Map active={!!mapPoints}>
          <MapFiledLeafLet points={mapPoints} disabled />
        </Map>
      </Column>

      <Column listWrapped>
        <h3>{tEventDetail('eventMainInfo.participantsCategories')}</h3>

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

        <CategoriesShareTitle>{tEventDetail('eventMainInfo.share')}</CategoriesShareTitle>
        <CategorySocials>
          <EmailShareButton
            subject={event?.name}
            body={event?.description?.description}
            url={`https://dev.hustlefree.pro/en/events/${event.id}`}
          >
            <EventGoogleHover />
          </EmailShareButton>
          <FacebookShareButton url={`https://dev.hustlefree.pro/en/events/${event.id}`}>
            <EventFacebookHover />
          </FacebookShareButton>
          <VKShareButton
            url={`https://dev.hustlefree.pro/en/events/${event.id}`}
            title={event.name}
            image={event?.description?.banner}
            noParse={true}
          >
            <EventVKHover />
          </VKShareButton>
          <TelegramShareButton
            url={`https://dev.hustlefree.pro/en/events/${event.id}`}
            title={event.name}
          >
            <EventTGHover />
          </TelegramShareButton>
          <div onClick={() => copyUrl(`https://dev.hustlefree.pro/en/events/${event.id}`)}>
            <EventLinkHover />
          </div>
        </CategorySocials>

        {!!event?.qrCode && (
          <>
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
          </>
        )}
      </Column>
    </MainWrapper>
  )
}

export default EventMainInfo

const QRTitle = styled.h3`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
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

const MainWrapper = styled.div`
  display: grid;
  grid-template: 1fr / repeat(3, 1fr);
  grid-column-gap: 16px;
  padding: 0 0 32px 0;
  border-bottom: 1px solid #333;
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

  h3 {
    font-weight: 600;
    font-size: 24px;
    color: #f2f2f2;
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

const ContactsSocials = styled.div`
  display: flex;
  align-items: center;
  grid-column-gap: 24px;
`

const Map = styled.div`
  width: 500px;
  height: 151px;
  border-radius: 16px;
`

const CategorySocials = styled.div`
  display: flex;
  grid-gap: 16px;
`

const CategoriesShareTitle = styled.h3`
  height: 100%;
  display: flex;
  align-items: flex-end;
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
