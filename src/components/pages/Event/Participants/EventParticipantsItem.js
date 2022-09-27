import { Checkbox } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import DropdownData from '../../../ui/DropdownData'
import ParticipantsList from './ParticipantsList'

const EventParticipantsItem = ({
  eventParticipant,
  isOrganizer,
  isAthletes,
  selectedEPC,
  setSelectedEPC,
}) => {
  const { eventParticipantsCategory, level } = eventParticipant
  const { t: tEventDetail } = useTranslation('eventDetail')
  const participantsValues = useMemo(() => {
    if (isOrganizer) {
      const isPaid = eventParticipant?.participants.filter((participant) => participant.isPaid)
      const isNotPaid = eventParticipant?.participants.filter((participant) => !participant.isPaid)
      const registered = eventParticipant?.participants.filter(
        (participant) => participant.proposal === 'add_event',
      )

      return { isPaid, isNotPaid, registered }
    } else {
      const registered = eventParticipant?.participants.filter(
        (participant) => participant.proposal === 'add_event',
      )
      const unconfirmed = eventParticipant?.participants.filter(
        (participant) => participant.proposal === 'waiting_list',
      )
      return { registered, unconfirmed }
    }
  }, [eventParticipant])

  const [open, setOpen] = useState(
    Object.keys(participantsValues).some((key) => !!participantsValues[key]?.length),
  )

  const { current: info } = useRef(
    <Info>
      <InfoText>
        {tEventDetail('event.participants.eventParticipantsItem.total')}:{' '}
        {eventParticipant?.allParticipants}
      </InfoText>
      {isOrganizer && (
        <InfoText color={'#6D4EEA'}>
          {tEventDetail('event.participants.eventParticipantsItem.confirmed')}:{' '}
          {eventParticipant?.allParticipants
            ? (+eventParticipant?.allParticipants || 0) -
              (+eventParticipant?.isNotAcceptParticipants || 0)
            : 0}
        </InfoText>
      )}
      <InfoText color='#27AE60'>
        {tEventDetail('event.participants.eventParticipantsItem.registrations')}:{' '}
        {eventParticipant?.isAcceptParticipants}
      </InfoText>
      <InfoText color='#F2994A'>
        {tEventDetail('event.participants.eventParticipantsItem.unconfirmed')}:{' '}
        {eventParticipant?.isNotAcceptParticipants}
      </InfoText>
    </Info>,
  )

  const header = (
    <HeaderWrapper>
      <ChekboxWrapper>
        <Checkbox
          checked={!!selectedEPC?.length && selectedEPC.includes(eventParticipant?.id)}
          onChange={({ target: { checked } }) =>
            checked
              ? setSelectedEPC((s) => [...(s || []), eventParticipant?.id])
              : setSelectedEPC((s) => s.filter((id) => id !== eventParticipant?.id))
          }
        />
      </ChekboxWrapper>

      <p onClick={() => setOpen(!open)}>
        {`${eventParticipantsCategory.name} / ${level?.name} / ${eventParticipantsCategory.fromAge} -
        ${eventParticipantsCategory.toAge} лет / ${eventParticipantsCategory.fromWeight} кг - ${eventParticipantsCategory.toWeight} кг`}
      </p>
    </HeaderWrapper>
  )

  return (
    <Item>
      <DropdownData
        isAthletes={isAthletes}
        active={open}
        heightWrapper={'184px'}
        additionalData={info}
        title={header}
      >
        {isOrganizer ? (
          <>
            {!!participantsValues?.isPaid?.length && (
              <TitleList>{tEventDetail('event.participants.eventParticipantsItem.paid')}</TitleList>
            )}
            <ParticipantsList active={true} participants={participantsValues.isPaid} />
            {!!participantsValues?.isNotPaid?.length && (
              <TitleList>
                {tEventDetail('event.participants.eventParticipantsItem.notPaid')}
              </TitleList>
            )}
            <ParticipantsList active={false} participants={participantsValues.isNotPaid} />
            {!!participantsValues?.registered?.length && (
              <TitleList>
                {tEventDetail('event.participants.eventParticipantsItem.confirmed')}
              </TitleList>
            )}
            <ParticipantsList active={true} participants={participantsValues.registered} />
          </>
        ) : (
          <>
            {!!participantsValues?.registered?.length && (
              <TitleList>
                {tEventDetail('event.participants.eventParticipantsItem.registers')}
              </TitleList>
            )}
            <ParticipantsList active={true} participants={participantsValues.registered} />
            {!!participantsValues?.unconfirmed?.length && (
              <TitleList>
                {tEventDetail('event.participants.eventParticipantsItem.unconfirmeds')}
              </TitleList>
            )}
            <ParticipantsList active={false} participants={participantsValues.unconfirmed} />
          </>
        )}
      </DropdownData>
    </Item>
  )
}

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  p {
    width: calc(100% + 48px);
    transform: translateX(16px);
    padding: 0 48px 0 0;
    z-index: 1;
  }
`

const ChekboxWrapper = styled.div`
  width: min-content;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  & .MuiCheckbox-root {
    padding: 0 !important;
  }
`

const Item = styled.div`
  margin-bottom: 32px;
`
const Info = styled.div`
  padding-bottom: 32px;
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
  color: ${(p) => (p.color ? p.color : '#f2f2f2')};
`

export default EventParticipantsItem
