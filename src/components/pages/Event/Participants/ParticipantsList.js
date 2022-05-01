import React from "react"
import styled from "styled-components"
import ParticipantsItem from "./ParticipantsItem"

const ParticipantsList = ({ participants }) => {
  return (
    <ParticipantsListUl>
      {participants.map((participant) => (
        <ParticipantsItem key={participant.id} participant={participant} />
      ))}
    </ParticipantsListUl>
  )
}

const ParticipantsListUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 24px;
`

export default ParticipantsList
