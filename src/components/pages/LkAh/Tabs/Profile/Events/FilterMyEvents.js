import React from "react"
import styled from "styled-components"
import { getRusBetweenDate } from "../../../../../../helpers/helpers"
import { CalendarIcon, LocationIcon } from "../../../../Events/EventsSlider"
import { Avatar, IconButton } from "@mui/material"
import { DEFAULT_API_URL } from "../../../../../../services/constants"

function FilterMyEvents({ data }) {
  return (
    <EventContainer key={data?.id}>
      <EventItems>
        <Avatar
          alt={DEFAULT_API_URL + data?.event?.image}
          src={DEFAULT_API_URL + data?.event?.image}
          sx={{ width: 112, height: 112 }}
        />
        <EventsInfo>
          <EventInfoHeadingText>{data?.event?.name}</EventInfoHeadingText>
          <EventInfoParticipantsInfo>
            {data?.participationCategory?.eventParticipantsCategory?.name} /{" "}
            {data?.participationCategory?.level} /{" "}
            {data?.participationCategory?.eventParticipantsCategory?.fromAge}-
            {data?.participationCategory?.eventParticipantsCategory?.toAge} лет
            /{" "}
            {data?.participationCategory?.eventParticipantsCategory?.fromWeight}{" "}
            кг -{" "}
            {data?.participationCategory?.eventParticipantsCategory?.toWeight}{" "}
            кг{" "}
          </EventInfoParticipantsInfo>
          <EventBottomInfo>
            <LocationIcon color={"#828282"} />
            <EventCitiesAndDateInfo>
              {data?.event?.country}, {data?.event?.city}
            </EventCitiesAndDateInfo>
          </EventBottomInfo>
          <EventBottomInfo>
            <CalendarIcon color={"#828282"} />
            <EventCitiesAndDateInfo>
              {getRusBetweenDate(data?.event?.dateStart, data?.event?.dateEnd)}
            </EventCitiesAndDateInfo>
          </EventBottomInfo>
        </EventsInfo>

        <EventRightInfo>
          <IconButton sx={{ padding: 0 }}>
            <ManyEllipseIcon />
          </IconButton>
          <PaidInfo color={"#27AE60 "}>Оплачено</PaidInfo>
        </EventRightInfo>
      </EventItems>
    </EventContainer>
  )
}

// #27AE60 #EB5757

export default FilterMyEvents

const EventContainer = styled.div`
  width: 100%;
  padding: 32px;
  border: 1px solid #333333;
`

const EventRightInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 100%;
`

const PaidInfo = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${({ color }) => color};
`

const EventItems = styled.div`
  display: grid;
  grid-template-columns: 112px auto min-content;
  grid-column-gap: 32px;
`
const EventsInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-gap: 16px;
`

const EventBottomInfo = styled.div`
  max-width: 300px;
  width: 100%;
  display: grid;
  grid-template-columns: 1.5fr 10fr;
  align-items: center;
`

const EventCitiesAndDateInfo = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #f2f2f2;
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

export const ManyEllipseIcon = () => (
  <svg
    width="6"
    height="32"
    viewBox="0 0 6 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="3" cy="3" r="3" fill="#333333" />
    <circle cx="3" cy="16" r="3" fill="#333333" />
    <circle cx="3" cy="29" r="3" fill="#333333" />
  </svg>
)
