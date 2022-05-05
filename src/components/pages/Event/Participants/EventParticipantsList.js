import React from "react"
import styled from "styled-components"
import EventParticipantsItem from "./EventParticipantsItem"
import { useSelector } from "react-redux"

const EventParticipantsList = ({ eventParticipants }) => {
  const { user } = useSelector((state) => state.user)

  return (
    <>
      <Title>
        {user?.role !== "organizer" &&
          "Категории на основе сведений в вашем профиле"}
      </Title>
      {eventParticipants.map((eventParticipant) => (
        <EventParticipantsItem
          key={eventParticipant.id}
          isOrganizer={user?.role === "organizer"}
          eventParticipant={eventParticipant}
        />
      ))}
    </>
  )
}

const Title = styled.h4`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
  margin: 47px 0 32px 0;
`

export default EventParticipantsList
