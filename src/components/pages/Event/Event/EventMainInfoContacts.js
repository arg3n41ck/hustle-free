import React, { useMemo } from 'react'
import {
  EventEmail,
  EventFacebook,
  EventLinkedin,
  EventOrganisation,
  EventOrganizer,
  EventPhone,
  EventVK,
} from './EventIcons'
import styled from 'styled-components'
import { phoneFormatter } from '../../../../helpers/phoneFormatter'
import { useTranslation } from 'next-i18next'
import { theme } from '../../../../styles/theme'

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

function EventMainInfoContacts({ event }) {
  const { t: tEventDetail } = useTranslation('eventDetail')
  const contacts = useMemo(() => {
    return getContacts(event)
  }, [event])
  return (
    <ContactsWrapper>
      <div>
        <h3 className='hide-on-mob'>{tEventDetail('eventMainInfo.contacts')}</h3>
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
      </div>
      <div>
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
      </div>
    </ContactsWrapper>
  )
}

export default EventMainInfoContacts

const ContactsWrapper = styled.div`
  display: grid;
  grid-template: 1fr / 1fr 1fr;
  grid-gap: 16px;

  ${theme.mqMin('xl')} {
    grid-template: 1fr 1fr / 1fr;
  }

  ${theme.mqMax('sm')} {
    grid-template: auto auto / 1fr;
  }
`

const ContactsSocials = styled.div`
  display: flex;
  align-items: center;
  grid-column-gap: 24px;
  margin-top: 24px;
`
