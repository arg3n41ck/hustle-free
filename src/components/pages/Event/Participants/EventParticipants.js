import React, { useEffect, useState } from 'react'
import Filters from './Filters'
import EventParticipantsList from './EventParticipantsList'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { getEnabledLevels } from '../Categories/EventCategories'
import useQuery from '../../../../hooks/useQuery'
import { fetchParticipantCategories } from '../../../../redux/components/participantsCategories'

const EventParticipants = () => {
  const {
    query: { id: eventId },
    push: routerPush,
  } = useRouter()
  const query = useQuery()
  const { data: eventParticipants } = useSelector(
    (state) => state.participantCategories.participantCategories,
  )
  const [levels, setLevels] = useState([])
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const filterHandler = ({ target: { name, value } }) => {
    if (!!value) {
      query.set(name, value)
    } else {
      name && query.delete(name)
    }
    routerPush(`/events/${eventId}/participants/?${query}`)
  }

  useEffect(() => {
    setLevels(getEnabledLevels(eventParticipants))
  }, [eventParticipants])

  useEffect(async () => {
    query.set('event', eventId)
    dispatch(fetchParticipantCategories(query))
    query.delete('event')
  }, [query])

  return (
    <>
      <Filters levels={levels} onFilter={filterHandler} />
      <EventParticipantsList
        eventParticipants={eventParticipants}
        isAthletes={!!user?.role === 'athlete'}
      />
      {/* <EventParticipantsList eventParticipants={eventParticipants} />/ */}
    </>
  )
}

export default EventParticipants
