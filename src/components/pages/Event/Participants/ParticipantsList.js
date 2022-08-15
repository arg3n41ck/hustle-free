import React from "react"
import styled from "styled-components"
import { ParticipantsItem, OgParticipantsItem } from "./ParticipantsItem"
import $api from "../../../../services/axios"
import { useRouter } from "next/router"

const ParticipantsList = ({ participants, active = true, isOrganizer }) => {
  const {
    query: { id: eventId },
  } = useRouter()
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
      {isOrganizer ? (
        <>
          {!!participants?.length &&
            participants.map((participant) => (
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
          {!!participants?.length &&
            participants.map((participant) => (
              <ParticipantsItem
                key={participant.id}
                participant={participant}
              />
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
