import React from "react"
import styled from "styled-components"
import { Collapse } from "@mui/material"
import StoryCollapse from "../LkAh/Tabs/Profile/Stories/StoryCollapse"

function Participations({
  eventName,
  level,
  fromAge,
  fromWeight,
  toAge,
  name,
  toWeight,
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <EventsWrapper>
      <EventsMainInfo onClick={() => setOpen((s) => !s)}>
        <MedalContainer>
          <MedalInfoPlace>0</MedalInfoPlace>
          <MedalInfoPlaceText>место</MedalInfoPlaceText>
        </MedalContainer>
        <EventsInfo>
          <EventInfoHeadingText>{eventName || ""}</EventInfoHeadingText>
          <EventInfoParticipantsInfo>
            {(name && `${name} / `) || ""}
            {(level && `${level} / `) || ""}
            {(fromAge && `${fromAge}-`) || ""}
            {(toAge && `${toAge} лет / `) || ""}
            {(fromWeight && `${fromWeight} кг - `) || ""}
            {(toWeight && `${toWeight}  кг`) || ""}
          </EventInfoParticipantsInfo>
        </EventsInfo>
      </EventsMainInfo>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <StoryCollapse />
      </Collapse>
    </EventsWrapper>
  )
}

export default Participations

const EventsWrapper = styled.div`
  padding: 32px;
  border-bottom: 1px solid #333;

  &:last-child {
    border-bottom: none;
  }
`
const EventsMainInfo = styled.div`
  display: grid;
  grid-template: 1fr / 104px auto;
  grid-column-gap: 32px;
`

const MedalInfoPlace = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 48px;
  color: #fbfbfb;
`

const MedalInfoPlaceText = styled.p`
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 24px;
  color: #fbfbfb;
`

const MedalContainer = styled.div`
  max-width: 104px;
  height: 104px;
  border: 1px solid #333333;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 20px;
`

const EventsInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-gap: 16px;
`

const EventInfoHeadingText = styled.h2`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
`

const EventInfoParticipantsInfo = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  color: #f2f2f2;
`