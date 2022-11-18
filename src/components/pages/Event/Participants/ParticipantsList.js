import React from 'react'
import styled from 'styled-components'
import { ParticipantsItem, OgParticipantsItem } from './ParticipantsItem'
import $api from '../../../../services/axios'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser, selectOgEvents } from '../../../../redux/components/user'
import { theme } from '../../../../styles/theme'
import useQuery from '../../../../hooks/useQuery'
import { fetchParticipantCategories } from '../../../../redux/components/participantsCategories'

const ParticipantsList = ({ participants, active = true }) => {
  const {
    query: { id: eventId },
  } = useRouter()
  const query = useQuery()
  const { user } = useSelector((state) => state.user)
  const [ogEventsId] = useSelector(selectOgEvents)
  const ogAndIsMyEvent = user?.role === 'organizer' && (ogEventsId || []).includes(+eventId)
  const dispatch = useDispatch()

  const acceptHandler = async (id) => {
    await $api
      .post(`/events/events/${eventId}/add_participant/`, {
        participant: id,
        proposal: true,
      })
      .then(() => {
        query.set('event', eventId)
        dispatch(fetchParticipantCategories(query))
        dispatch(fetchUser())
      })
  }

  const deleteHandler = async (id) => {
    await $api
      .post(`/events/events/${eventId}/add_participant/`, {
        event_id: +eventId,
        participant: id,
        proposal: false,
      })
      .then(() => {
        query.set('event', eventId)
        dispatch(fetchParticipantCategories(query))
        dispatch(fetchUser())
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;

  ${theme.mqMax('xl')} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${theme.mqMax('md')} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;
    max-height: 400px;
    overflow-y: auto;
  }

  ${theme.mqMax('sm')} {
    grid-template-columns: 1fr;
    grid-gap: 16px;
  }
  p {
    color: ${(p) => (p.active ? '#BDBDBD' : '#828282')};
  }
`

export default ParticipantsList
