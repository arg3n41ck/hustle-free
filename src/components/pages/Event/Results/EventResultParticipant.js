import React, { useState } from 'react'
import { FirstPlaceIcon } from '../../../../assets/svg/icons'
import { SecondPlaceIcon } from '../../../../assets/svg/icons'
import { ThirdPlaceIcon } from '../../../../assets/svg/icons'
import PlaceField from './PlaceField'
import styled from 'styled-components'
import $api from '../../../../services/axios'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { selectOgEvents } from '../../../../redux/components/user'

export const changeParticipantPlace = async (eventId, data) => {
  try {
    await $api.patch(`/events/events/${eventId}/participant_place/`, data)
  } catch (error) {
    console.log(error)
  }
}

function EventResultParticipant({ participant, isRobinRound }) {
  const user = useSelector((state) => state.user.user)
  const [place, setPlace] = useState(participant.place)
  const { t: tEventDetail } = useTranslation('eventDetail')
  const {
    query: { id: eventId },
  } = useRouter()
  const [ogEventsId] = useSelector(selectOgEvents)
  const ogAndIsMyEvent = user?.role === 'organizer' && (ogEventsId || []).includes(+eventId)

  const onChange = (pcId, count) => {
    setPlace(count)
    changeParticipantPlace(eventId, {
      participant: pcId,
      place: count,
    })
  }

  return (
    <Item key={participant.id}>
      <Left>
        {(place === 1 && <FirstPlaceIcon />) ||
          (place === 2 && <SecondPlaceIcon />) ||
          (place === 3 && <ThirdPlaceIcon />) || (
            <OtherPlace>
              <p>{place || '?'}</p>
            </OtherPlace>
          )}
        <Title>{`${participant?.athlete?.user?.firstName} ${participant?.athlete?.user?.lastName}`}</Title>
      </Left>
      <Right>
        <InfoItem>
          <InfoItemTitle>
            {tEventDetail('event.results.eventResultsParticipant.team')}
          </InfoItemTitle>
          <InfoItemDescription>{participant.team?.name}</InfoItemDescription>
        </InfoItem>
        {!!participant?.athlete?.user?.country && (
          <InfoItem>
            <InfoItemTitle>
              {tEventDetail('event.results.eventResultsParticipant.country')}
            </InfoItemTitle>
            <InfoItemDescription>{participant.athlete.user?.country}</InfoItemDescription>
          </InfoItem>
        )}
        {!!isRobinRound && !!ogAndIsMyEvent && (
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
  display: grid;
  grid-template: 1fr / 1.5fr min-content;
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
  display: grid;
  grid-template: 1fr / 1fr 1fr 100px;
  grid-gap: 20px;
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
