import { Add } from '@mui/icons-material'
import { useTranslation } from 'next-i18next'
import React from 'react'
import styled from 'styled-components'
import EventCreateForm from './EventCreateForm'

function EventsBrackets({ eventId }) {
  const { t: tLkOg } = useTranslation('lkOg')

  return (
    <div>
      <EventCreateForm eventId={eventId} />
      <CreateNewLabel>
        <Add sx={{ height: 24, width: 24, color: '#6D4EEA' }} />
        {tLkOg('brackets.createNewLabel')}
      </CreateNewLabel>
    </div>
  )
}

export default EventsBrackets

const CreateNewLabel = styled.button`
  display: flex;
  align-items: center;
  grid-column-gap: 8px;

  font-weight: 600;
  font-size: 18px;

  color: #ffffff;

  padding: 40px 0;

  & svg > path {
    fill: #6d4eea;
  }
`
