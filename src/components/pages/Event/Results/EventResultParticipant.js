import React, { useState } from "react"
import GoldIcon from "../../../../public/svg/second-gold-medal.svg"
import SilverIcon from "../../../../public/svg/second-silver-medal.svg"
import BronzeIcon from "../../../../public/svg/second-bronze-medal.svg"
import PlaceField from "./PlaceField"
import styled from "styled-components"
import $api from "../../../../services/axios"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

const changeParticipantPlace = async (eventId, data) => {
  await $api.patch(`/organizer/events/${eventId}/participant-place/`, data)
}

function EventResultParticipant({ participant, updatePC }) {
  const user = useSelector((state) => state.user.user)
  const [place, setPlace] = useState(participant.place)
  const {
    query: { id: eventId },
  } = useRouter()

  const onChange = (pcId, count) => {
    setPlace(count)
    changeParticipantPlace(eventId, {
      participant_id: pcId,
      place: count,
    })
    updatePC()
  }

  return (
    <Item key={participant.id}>
      <Left>
        {(place === 1 && <GoldIcon />) ||
          (place === 2 && <SilverIcon />) ||
          (place === 3 && <BronzeIcon />) || (
            <OtherPlace>
              <p>{place}</p>
            </OtherPlace>
          )}
        <Title>{participant.fullName}</Title>
      </Left>
      <Right>
        <InfoItem>
          <InfoItemTitle>Команда</InfoItemTitle>
          <InfoItemDescription>{participant.team}</InfoItemDescription>
        </InfoItem>
        {participant.country && (
          <InfoItem>
            <InfoItemTitle>Страна</InfoItemTitle>
            <InfoItemDescription>{participant.country}</InfoItemDescription>
          </InfoItem>
        )}
        {user?.role === "organizer" && (
          <PlaceField
            defaultCount={place || 0}
            onChange={(count) => onChange(participant.id, count)}
          />
        )}
      </Right>
    </Item>
  )
}

export default EventResultParticipant

const Item = styled.li`
  display: flex;
  justify-content: space-between;
`
const Left = styled.div`
  display: flex;
  align-items: center;
`
const Title = styled.h3`
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  text-transform: uppercase;
  color: #f2f2f2;
  margin-left: 24px;
`
const Right = styled.div`
  display: flex;
  align-items: center;
`
const InfoItem = styled.div`
  border-left: 1px solid #333333;
  padding: 0 32px;
`
const InfoItemTitle = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #828282;
`
const InfoItemDescription = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #f2f2f2;
`
const OtherPlace = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 32px;
  color: #fbfbfb;
  background: #1b1c22;
  border-radius: 8px;
  border: 1px solid #333333;
  padding: 12px;
  width: 72px;
  height: 72px;
`
