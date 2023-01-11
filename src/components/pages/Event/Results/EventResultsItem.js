import React, { useMemo, useState } from 'react'
import DropdownData from '../../../ui/DropdownData'
import styled from 'styled-components'
import { Box, Collapse, useMediaQuery } from '@mui/material'
import EventResultParticipant from './EventResultParticipant'
import { useTranslation } from 'next-i18next'
import ULAccordion from '../../../ui/ULAccordion'
import MobileResultsRow from './MobileResultsRow'

const EventResultsItem = ({ participant }) => {
  if (!participant) return null
  const { eventParticipantsCategory, level } = participant
  const { t: tEventDetail } = useTranslation('eventDetail')
  const desk = useMediaQuery('(min-width: 768px)')
  const [showAll, setShowAll] = useState(false)
  const participants = useMemo(() => {
    return participant.participants.sort((a, b) => (a?.place || 0) - (b?.place || 0))
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
            <List>
              {participants.slice(0, 3).map((participant) => (
                <EventResultParticipant
                  key={`results-pc-${participant.id}`}
                  participant={participant}
                />
              ))}
            </List>
            {participants?.length > 3 && (
              <>
                <Collapse in={showAll}>
                  <List>
                    {participants.slice(-(participants.length - 3)).map((participant) => (
                      <EventResultParticipant
                        key={`results-pc-${participant.id}`}
                        participant={participant}
                      />
                    ))}
                  </List>
                </Collapse>
                <ShowAll onClick={() => setShowAll(!showAll)}>
                  {showAll ? 'Скрыть' : 'Показать еще'}
                </ShowAll>
              </>
            )}
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
          <MobileResultsRow participants={participants} />
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

const ShowAll = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: #1b1c22;
  border-top: 1px solid #1b1c22;
  border-radius: 0 0 16px 16px;

  font-weight: 400;
  font-size: 22px;
  line-height: 36px;
  color: #bdbdbd;
`

export default EventResultsItem
