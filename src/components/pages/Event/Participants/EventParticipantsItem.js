import React, { useMemo, useState } from "react"
import styled from "styled-components"
import DropdownData from "../../../ui/DropdownData"
import ParticipantsList from "./ParticipantsList"

const EventParticipantsItem = ({ eventParticipant, isOrganizer, isAthletes }) => {
  const [open, setOpen] = useState(false)
  const { eventParticipantsCategory } = eventParticipant

  const participantsValues = useMemo(() => {
    if (isOrganizer) {
      const isPaid = eventParticipant.participants.filter(
        (participant) => participant.isPaid
      )
      const isNotPaid = eventParticipant.participants.filter(
        (participant) => !participant.isPaid
      )
      const registered = eventParticipant.participants.filter(
        (participant) => participant.proposal === "add_event"
      )

      return { isPaid, isNotPaid, registered }
    } else {
      const registered = eventParticipant.participants.filter(
        (participant) => participant.proposal === "add_event"
      )
      const unconfirmed = eventParticipant.participants.filter(
        (participant) => participant.proposal === "waiting_list"
      )
      return { registered, unconfirmed }
    }
  }, [eventParticipant])

  const info = (
    <Info>
      <InfoText>Всего: {eventParticipant.allParticipants}</InfoText>
      {/*{isOrganizer && (*/}
      {/*  <InfoText color={"#6D4EEA"}>*/}
      {/*    Подтвержденные: {eventParticipant.allParticipants}*/}
      {/*  </InfoText>*/}
      {/*)}*/}
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
        isAthletes={isAthletes}
        active={open}
        setActive={setOpen}
        heightWrapper={"184px"}
        additionalData={info}
        title={`${eventParticipantsCategory.name} / ${eventParticipant.level} / ${eventParticipantsCategory.fromAge} - ${eventParticipantsCategory.toAge} лет / ${eventParticipantsCategory.fromWeight} кг - ${eventParticipantsCategory.toWeight} кг`}
      >
        {isOrganizer ? (
          <>
            {!!participantsValues?.isPaid?.length && (
              <TitleList>Оплачено</TitleList>
            )}
            <ParticipantsList
              isOrganizer={true}
              active={true}
              participants={participantsValues.isPaid}
            />
            {!!participantsValues?.isNotPaid?.length && (
              <TitleList>Не оплачено</TitleList>
            )}
            <ParticipantsList
              isOrganizer={true}
              active={false}
              participants={participantsValues.isNotPaid}
            />
            {!!participantsValues?.registered?.length && (
              <TitleList>Подтвержденные</TitleList>
            )}
            <ParticipantsList
              isOrganizer={true}
              active={false}
              participants={participantsValues.registered}
            />
          </>
        ) : (
          <>
            {!!participantsValues?.registered?.length && (
              <TitleList>Зарегистрированные</TitleList>
            )}
            <ParticipantsList
              isOrganizer={false}
              active={true}
              participants={participantsValues.registered}
            />
            {!!participantsValues?.unconfirmed?.length && (
              <TitleList>Неподтвержденные</TitleList>
            )}
            <ParticipantsList
              isOrganizer={false}
              active={false}
              participants={participantsValues.unconfirmed}
            />
          </>
        )}
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
const TitleList = styled.h4`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  color: #f2f2f2;
  margin: 32px 0 24px 0;
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
