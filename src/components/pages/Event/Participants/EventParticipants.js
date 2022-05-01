import React, { useEffect, useState } from "react"
import EventParticipantsList from "./EventParticipantsList"
import $api from "../../../../services/axios"

const EventParticipants = () => {
  const [eventParticipants, setEventParticipants] = useState([])

  useEffect(async () => {
    const { data } = await $api.get(`/events/participant_category/`)
    setEventParticipants(data)
  }, [])

  return (
    <>
      <EventParticipantsList eventParticipants={eventParticipants} />
    </>
  )
}

export default EventParticipants
