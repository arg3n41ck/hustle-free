import { Collapse } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { FirstPlaceIcon, SecondPlaceIcon, ThirdPlaceIcon } from '../../../../assets/svg/icons'
import { selectOgEvents } from '../../../../redux/components/user'
import { changeParticipantPlace } from './EventResultParticipant'
import PlaceField from './PlaceField'

const PlaceContent = ({ participant, eventId, ogAndIsMyEvent, isRobinRound }) => (
  <Wrapper key={participant?.id}>
    {(participant?.place === 1 && <FirstPlaceIcon style={{ height: '50px', width: '50px' }} />) ||
      (participant?.place === 2 && <SecondPlaceIcon style={{ height: '50px', width: '50px' }} />) ||
      (participant?.place === 3 && (
        <ThirdPlaceIcon style={{ height: '50px', width: '50px' }} />
      )) || (
        <OtherPlace>
          <p>{participant?.place || '?'}</p>
        </OtherPlace>
      )}
    <Texts>
      <Title>{`${participant?.athlete?.user?.firstName} ${participant?.athlete?.user?.lastName}`}</Title>
      <Country>{participant?.athlete.user?.country}</Country>
      <Team>{participant?.team?.name}</Team>
    </Texts>
    {!!isRobinRound && !!ogAndIsMyEvent && (
      <PlaceField
        defaultCount={participant?.place || 0}
        onChange={(count) => {
          changeParticipantPlace(eventId, {
            participant: participant?.id,
            place: count,
          })
        }}
      />
    )}
  </Wrapper>
)

export default function MobileResultsRow({ participants, updatePC }) {
  const {
    query: { id: eventId },
  } = useRouter()
  const [open, setOpen] = useState(false)
  const user = useSelector((state) => state.user.user)
  const [ogEventsId] = useSelector(selectOgEvents)
  const ogAndIsMyEvent = user?.role === 'organizer' && (ogEventsId || []).includes(+eventId)

  return (
    <div>
      {!!participants?.length &&
        (participants?.length < 3 ? (
          participants.map((participant) => (
            <PlaceContent
              key={participant.id}
              participant={participant}
              updatePC={updatePC}
              eventId={eventId}
              ogAndIsMyEvent={ogAndIsMyEvent}
            />
          ))
        ) : (
          <>
            {participants.slice(0, 3).map((participant) => (
              <PlaceContent
                key={participant.id}
                participant={participant}
                updatePC={updatePC}
                eventId={eventId}
                ogAndIsMyEvent={ogAndIsMyEvent}
              />
            ))}
            {participants?.length > 3 && (
              <>
                <Collapse in={open}>
                  {participants.slice(-(participants.length - 3)).map((participant) => (
                    <PlaceContent
                      key={participant.id}
                      participant={participant}
                      updatePC={updatePC}
                      eventId={eventId}
                      ogAndIsMyEvent={ogAndIsMyEvent}
                    />
                  ))}
                </Collapse>
                <OpenClose onClick={() => setOpen(!open)}>
                  {open ? 'Скрыть' : 'Показать еще'}
                </OpenClose>
              </>
            )}
          </>
        ))}
    </div>
  )
}

const Wrapper = styled.div`
  overflow: auto;
  display: grid;
  grid-template: 1fr / 50px auto 100px;
  grid-gap: 16px;
  padding: 12px 16px;

  background: #141519;
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
  width: 50px;
  height: 50px;
`

const Texts = styled.div`
  min-width: 120px;
  display: flex;
  flex-direction: column;
  grid-gap: 4px;
`

const Title = styled.h3`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: #f2f2f2;
`

const Country = styled.p`
  font-weight: 400;
  font-size: 16px;
  color: #a0a0a0;
`

const Team = styled.p`
  font-weight: 600;
  font-size: 16px;
  color: #bdbdbd;
`

const OpenClose = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: #1b1c22;
  border-top: 1px solid #1b1c22;

  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #bdbdbd;
`
