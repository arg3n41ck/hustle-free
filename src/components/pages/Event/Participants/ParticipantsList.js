import React from "react"
import styled from "styled-components"
import { ParticipantsItem, OgParticipantsItem } from "./ParticipantsItem"
import $api from "../../../../services/axios"

const ParticipantsList = ({ participants, active = true, isOrganizer }) => {
  const acceptHandler = async (id) => {
    await $api.patch(`/organizer/change_participant/${id}/`)
  }

  const deleteHandler = async (id) => {
    await $api.delete(`/organizer/change_participant/${id}/`)
  }

  return (
    <ParticipantsListUl active={active}>
      {isOrganizer ? (
        <>
          {participants.map((participant) => (
            <OgParticipantsItem
              key={participant.id}
              onDelete={deleteHandler}
              onAccept={acceptHandler}
              participant={participant}
              isRegistered={participant.proposal === "add_event"}
            />
          ))}
        </>
      ) : (
        <>
          {participants.map((participant) => (
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
    color: ${(p) => (p.active ? "#BDBDBD" : "#828282")};
  }
  h4 {
    color: ${(p) => (p.active ? "#fff" : "#828282")};
  }
`

export default ParticipantsList
