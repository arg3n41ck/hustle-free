import React from 'react'
import styled from 'styled-components'
import { ParticipantsItem, OgParticipantsItem } from './ParticipantsItem'
import $api from '../../../../services/axios'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectOgEvents } from '../../../../redux/components/user'

const ParticipantsList = ({ participants, active = true }) => {
  const {
    query: { id: eventId },
  } = useRouter()
  const { user } = useSelector((state) => state.user)
  const [ogEventsId] = useSelector(selectOgEvents)
  const ogAndIsMyEvent = user?.role === 'organizer' && (ogEventsId || []).includes(+eventId)
  const acceptHandler = async (id) => {
    await $api.post(`/events/events/${eventId}/add_participant/`, {
      participant: id,
      proposal: true,
    })
  }

  const deleteHandler = async (id) => {
    await $api.post(`/events/events/${eventId}/add_participant/`, {
      event_id: +eventId,
      participant: id,
      proposal: false,
    })
  }

  return (
    <ParticipantsListUl active={active}>
      {!!ogAndIsMyEvent ? (
        <>
          {!!participants?.length &&
            participants.map((participant) => (
              <OgParticipantsItem
                key={participant.id}
                onDelete={deleteHandler}
                onAccept={acceptHandler}
                participant={participant}
                isRegistered={participant.proposal === 'add_event'}
              />
            ))}
        </>
      ) : (
        <>
          {!!participants?.length &&
            participants.map((participant) => (
              <ParticipantsItem key={participant.id} participant={participant} />
            ))}
        </>
      )}
    </ParticipantsListUl>
  )
}

const ParticipantsListUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 24px;
  p {
    color: ${(p) => (p.active ? '#BDBDBD' : '#828282')};
  }
  h4 {
    color: ${(p) => (p.active ? '#fff' : '#828282')};
  }
`

export default ParticipantsList
