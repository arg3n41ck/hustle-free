import React, { useMemo, useState } from 'react'
import DropdownData from '../../../ui/DropdownData'
import styled from 'styled-components'
import { Box, useMediaQuery } from '@mui/material'
import EventResultParticipant from './EventResultParticipant'
import { useTranslation } from 'next-i18next'
import ULAccordion from '../../../ui/ULAccordion'
import MobileResultsRow from './MobileResultsRow'

const EventResultsItem = ({ participant, updatePC }) => {
  if (!participant) return null
  const { eventParticipantsCategory, level } = participant
  const { t: tEventDetail } = useTranslation('eventDetail')
  const desk = useMediaQuery('(min-width: 768px)')
  const participants = useMemo(() => {
    return participant.participants.sort((a, b) => a.place - b.place)
  }, [participant])

  const [open, setOpen] = useState(!!participants?.length)

  return (
    <Box sx={{ marginBottom: 4 }}>
      {desk ? (
        <DropdownData
          active={open}
          setActive={setOpen}
          heightWrapper={'100px'}
          title={`${eventParticipantsCategory.name} / ${level?.name} / ${
            eventParticipantsCategory.fromAge
          } - ${eventParticipantsCategory.toAge} ${tEventDetail(
            'event.results.eventResultsItem.years',
          )} / ${eventParticipantsCategory.fromWeight} ${tEventDetail(
            'event.results.eventResultsItem.kg',
          )} - ${eventParticipantsCategory.toWeight} ${tEventDetail(
            'event.results.eventResultsItem.kg',
          )}`}
        >
          <List>
            {participants.map((participant) => (
              <EventResultParticipant
                updatePC={updatePC}
                key={`results-pc-${participant.id}`}
                participant={participant}
              />
            ))}
          </List>
        </DropdownData>
      ) : (
        <ULAccordion
          defaultExpanded={!!participants.length}
          title={`${eventParticipantsCategory.name} / ${level?.name} / ${
            eventParticipantsCategory.fromAge
          } - ${eventParticipantsCategory.toAge} ${tEventDetail(
            'event.results.eventResultsItem.years',
          )} / ${eventParticipantsCategory.fromWeight} ${tEventDetail(
            'event.results.eventResultsItem.kg',
          )} - ${eventParticipantsCategory.toWeight} ${tEventDetail(
            'event.results.eventResultsItem.kg',
          )}`}
        >
          <MobileResultsRow participants={participants} updatePC={updatePC} />
        </ULAccordion>
      )}
    </Box>
  )
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
  grid-row-gap: 32px;
`
export default EventResultsItem
