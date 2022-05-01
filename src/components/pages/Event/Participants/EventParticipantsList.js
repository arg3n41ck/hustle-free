import React from "react"
import EventParticipantsItem from "./EventParticipantsItem"

const EventParticipantsList = ({ eventParticipants }) => {
  return (
    <>
      {eventParticipants.map((eventParticipant) => (
        <EventParticipantsItem
          key={eventParticipant.id}
          eventParticipant={eventParticipant}
        />
      ))}
    </>
  )
}

export default EventParticipantsList
