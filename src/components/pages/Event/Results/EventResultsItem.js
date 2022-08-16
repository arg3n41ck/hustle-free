import React, { useMemo, useState } from "react"
import DropdownData from "../../../ui/DropdownData"
import styled from "styled-components"
import { Box } from "@mui/material"
import EventResultParticipant from "./EventResultParticipant"
import { useTranslation } from "next-i18next"

const EventResultsItem = ({ participant, updatePC }) => {
  const [open, setOpen] = useState(false)
  if (!participant) return null
  const { eventParticipantsCategory, level } = participant
  const { t: tEventDetail } = useTranslation("eventDetail")

  const participants = useMemo(() => {
    return participant.participants.sort((a, b) => a.place - b.place)
  }, [participant])

  return (
    <Box sx={{ marginBottom: 4 }}>
      <DropdownData
        active={open}
        setActive={setOpen}
        heightWrapper={"100px"}
        title={`${eventParticipantsCategory.name} / ${level?.name} / ${
          eventParticipantsCategory.fromAge
        } - ${eventParticipantsCategory.toAge} ${tEventDetail(
          "event.results.eventResultsItem.years"
        )} / ${eventParticipantsCategory.fromWeight} ${tEventDetail(
          "event.results.eventResultsItem.kg"
        )} - ${eventParticipantsCategory.toWeight} ${tEventDetail(
          "event.results.eventResultsItem.kg"
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
    </Box>
  )
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
  grid-row-gap: 32px;
`
export default EventResultsItem
