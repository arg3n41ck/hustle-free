import React, { useMemo } from 'react'
import { EventFlag, EventLocation, EventMass } from './EventIcons'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { theme } from '../../../../styles/theme'

const MapFiledLeafLet = dynamic(() => import('../../../ui/Map/FieldLeaflet'), {
  ssr: false,
})

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

function EventMainInfoLocation({ event }) {
  const { t: tEventDetail } = useTranslation('eventDetail')
  const { addresses } = useMemo(() => {
    return {
      addresses: getAddresses(event),
    }
  }, [event])

  const mapPoints =
    event?.location?.lat && event?.location?.long
      ? {
          lat: +event?.location?.lat,
          lng: +event?.location?.long,
        }
      : null
  return (
    <LocationsWrapper>
      <div>
        <h3 className='hide-on-mob'>{tEventDetail('eventMainInfo.location')}</h3>
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
      </div>
      <Map active={!!mapPoints}>
        <MapFiledLeafLet points={mapPoints} disabled />
      </Map>
    </LocationsWrapper>
  )
}

export default EventMainInfoLocation

const LocationsWrapper = styled.div`
  display: grid;
  grid-template: 1fr / 1fr 1fr;
  grid-gap: 16px;
  background: #141519;
  padding: 16px 8px !important;

  ${theme.mqMin('xl')} {
    grid-template: 1fr 1fr / 1fr;
  }

  ${theme.mqMax('sm')} {
    grid-template: auto auto / 1fr;
  }
`

const Map = styled.div`
  max-width: 500px;
  width: 100%;
  height: 151px;
  border-radius: 16px;
`
