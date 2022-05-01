import React, { useState } from "react"
import styled from "styled-components"
import DropdownData from "../../../ui/DropdownData"

const EventParticipantsItem = ({ eventParticipant }) => {
  const [open, setOpen] = useState(false)
  const { eventParticipantsCategory } = eventParticipant

  const info = (
    <Info>
      <InfoText>Всего: 5</InfoText>
      <InfoText color="#6D4EEA">Подтвержденные: 5</InfoText>
      <InfoText color="#27AE60">Регистраций: 5</InfoText>
      <InfoText color="#F2994A">Неподтвержденных: 5</InfoText>
    </Info>
  )

  return (
    <Item>
      <DropdownData
        active={open}
        setActive={setOpen}
        heightWrapper={"184px"}
        additionalData={info}
        title={`${eventParticipantsCategory.name} / ${eventParticipantsCategory.fromAge} - ${eventParticipantsCategory.toAge} лет / ${eventParticipantsCategory.fromWeight} кг - ${eventParticipantsCategory.toWeight} кг`}
      >
        <h1>data</h1>
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
