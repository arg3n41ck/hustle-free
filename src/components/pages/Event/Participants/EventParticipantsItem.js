import React, { useState } from "react"
import styled from "styled-components"
import DropdownData from "../../../ui/DropdownData"

const EventParticipantsItem = ({ eventParticipant }) => {
  const [open, setOpen] = useState(false)

  const info = (
    <Info>
      <InfoText>Всего: 5</InfoText>
      <InfoText color="#6D4EEA">Подтвержденные: 5</InfoText>
      <InfoText color="#27AE60">Регистраций: 5</InfoText>
      <InfoText color="#F2994A">Неподтвержденных: 5</InfoText>
    </Info>
  )

  return (
    <DropdownData
      active={open}
      setActive={setOpen}
      heightWrapper={"184px"}
      additionalData={info}
      title={"Сеньор мужчины / Белый / 25-35 лет / 60 кг - 75 кг"}
    >
      <h1>data</h1>
    </DropdownData>
  )
}

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
