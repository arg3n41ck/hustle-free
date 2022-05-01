import React, { useState } from "react"
import styled from "styled-components"
import DropdownData from "../../../ui/DropdownData"
import ParticipantsList from "./ParticipantsList"

const EventParticipantsItem = ({ eventParticipant }) => {
  const [open, setOpen] = useState(false)
  const { eventParticipantsCategory } = eventParticipant

  const info = (
    <Info>
      <InfoText>Всего: {eventParticipant.allParticipants}</InfoText>
      <InfoText color="#27AE60">
        Регистраций: {eventParticipant.isAcceptParticipants}
      </InfoText>
      <InfoText color="#F2994A">
        Неподтвержденных: {eventParticipant.isNotAcceptParticipants}
      </InfoText>
    </Info>
  )

  return (
    <Item>
      <DropdownData
        active={open}
        setActive={setOpen}
        heightWrapper={"184px"}
        additionalData={info}
        title={`${eventParticipantsCategory.name} / ${eventParticipant.level} / ${eventParticipantsCategory.fromAge} - ${eventParticipantsCategory.toAge} лет / ${eventParticipantsCategory.fromWeight} кг - ${eventParticipantsCategory.toWeight} кг`}
      >
        <ParticipantsList participants={eventParticipant.participants} />
      </DropdownData>
    </Item>
  )
}

const Item = styled.div`
  margin-bottom: 32px;
`
const Info = styled.div`
  padding: 0 32px;
  border-top: 1px solid #333333;
  display: flex;
  align-items: center;
  height: 88px;
`
const InfoText = styled.p`
  margin-right: 24px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${(p) => (p.color ? p.color : "#f2f2f2")};
`

export default EventParticipantsItem
