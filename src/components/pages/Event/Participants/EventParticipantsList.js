import React from "react"
import styled from "styled-components"
import EventParticipantsItem from "./EventParticipantsItem"
import { useSelector } from "react-redux"
import { useTranslation } from "next-i18next"

const EventParticipantsList = ({ eventParticipants, isAthletes }) => {
  const { user } = useSelector((state) => state.user)
  const { t: tEventDetail } = useTranslation("eventDetail")

  return (
    <>
      {user?.role !== "organizer" && (
        <Title>
          {isAthletes
            ? tEventDetail(
                "event.participants.eventParticipantsList.categoriesBasedProfile"
              )
            : tEventDetail(
                "event.participants.eventParticipantsList.otherCategories"
              )}
        </Title>
      )}
      {eventParticipants.map((eventParticipant) => (
        <EventParticipantsItem
          key={eventParticipant.id}
          isAthletes={isAthletes}
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
