import { useTranslation } from 'next-i18next'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { theme } from '../../../../styles/theme'
import DropdownData from '../../../ui/DropdownData'
import { ParticipantsItem } from '../Participants/ParticipantsItem'

export default function BracketPCDropdown({ bracket, onSelectBracket }) {
  const { participationCategory } = bracket
  const { eventParticipantsCategory, level, participants } = participationCategory

  const { t: tEventDetail } = useTranslation('eventDetail')
  const [open, setOpen] = useState(true)

  const { current: info } = useRef(
    <Info>
      <InfoText>
        {tEventDetail('event.participants.eventParticipantsItem.total')}:{' '}
        {participationCategory?.allParticipants}
      </InfoText>

      <InfoText color={'#6D4EEA'}>
        {tEventDetail('event.participants.eventParticipantsItem.confirmed')}:{' '}
        {participationCategory?.allParticipants
          ? (+participationCategory?.allParticipants || 0) -
            (+participationCategory?.isNotAcceptParticipants || 0)
          : 0}
      </InfoText>

      <InfoText color='#27AE60'>
        {tEventDetail('event.participants.eventParticipantsItem.registrations')}:{' '}
        {participationCategory?.isAcceptParticipants}
      </InfoText>
      <InfoText color='#F2994A'>
        {tEventDetail('event.participants.eventParticipantsItem.unconfirmed')}:{' '}
        {participationCategory?.isNotAcceptParticipants}
      </InfoText>
    </Info>,
  )

  const header = `${eventParticipantsCategory.name} / ${level?.name} / ${eventParticipantsCategory.fromAge} -
        ${eventParticipantsCategory.toAge} лет / ${eventParticipantsCategory.fromWeight} кг - ${eventParticipantsCategory.toWeight} кг`

  const arrow = (
    <Arrow
      onClick={() =>
        onSelectBracket({
          ...bracket,
          title: header,
        })
      }
    >
      Сетка
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M17 11C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13V11ZM3 13C2.44771 13 2 12.5523 2 12C2 11.4477 2.44771 11 3 11V13ZM17 13H3V11H17V13Z'
          fill='white'
        />
        <path
          d='M21.7152 11.7966L16.265 7.90356C15.7355 7.52535 15 7.90385 15 8.55455V15.4454C15 16.0961 15.7355 16.4746 16.265 16.0964L21.7152 12.2034C21.8548 12.1037 21.8548 11.8963 21.7152 11.7966Z'
          fill='white'
        />
      </svg>
    </Arrow>
  )

  return (
    <div>
      <DropdownData
        active={open}
        heightWrapper={'184px'}
        additionalData={info}
        title={<p onClick={() => setOpen(!open)}>{header}</p>}
        arrow={arrow}
      >
        {participants?.length && (
          <ParticipantsWrapper>
            {participants
              .filter(({ isPaid }) => isPaid)
              .map((participant) => (
                <ParticipantsItem
                  key={`bracket_participant_${participant.id}`}
                  participant={participant}
                />
              ))}
          </ParticipantsWrapper>
        )}
      </DropdownData>
    </div>
  )
}

const Info = styled.div`
  padding-bottom: 32px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 88px;
`

const InfoText = styled.p`
  margin-right: 24px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: ${(p) => (p.color ? p.color : '#f2f2f2')};
`

const ParticipantsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;

  ${theme.mqMax('xl')} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${theme.mqMax('md')} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;
    max-height: 400px;
    overflow-y: auto;
  }

  ${theme.mqMax('sm')} {
    grid-template-columns: 1fr;
    grid-gap: 16px;
  }
`

const Arrow = styled.button`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  gap: 8px;
  background: #6d4eea;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  border-radius: 12px;
`
