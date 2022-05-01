import React from "react"
import styled from "styled-components"
import { getRusBetweenDate } from "../../../../../../helpers/helpers"
import { CalendarIcon, LocationIcon } from "../../../../Events/EventsSlider"
import { DEFAULT_API_URL } from "../../../../../../services/constants"
import { Collapse } from "@mui/material"

function FilterMyStories({ data }) {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <EventContainer onClick={() => setOpen(!open)} key={data?.id}>
        <EventItems>
          {data?.place <= 3 && data?.place > 0 ? (
            <PlaceIcon place={data?.place} />
          ) : (
            <MedalContainer>
              <MedalInfoPlace>{data?.place}</MedalInfoPlace>
              <MedalInfoPlaceText>место</MedalInfoPlaceText>
            </MedalContainer>
          )}
          <EventsInfo>
            <EventInfoHeadingText>{data?.event?.name}</EventInfoHeadingText>
            <EventInfoParticipantsInfo>
              {data?.participationCategory?.eventParticipantsCategory?.name} /{" "}
              {data?.participationCategory?.level} /{" "}
              {data?.participationCategory?.eventParticipantsCategory?.fromAge}-
              {data?.participationCategory?.eventParticipantsCategory?.toAge}{" "}
              лет /{" "}
              {
                data?.participationCategory?.eventParticipantsCategory
                  ?.fromWeight
              }{" "}
              кг -{" "}
              {data?.participationCategory?.eventParticipantsCategory?.toWeight}{" "}
              кг{" "}
            </EventInfoParticipantsInfo>
          </EventsInfo>
        </EventItems>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <ParticipantInfoSummary>
            <ParticipantInfoSummaryField>
              <ParticipantInfoSummaryFieldCol1>
                <ParticipantInfoSummaryFieldCol1Text color={"#27ae60"}>
                  Выйграл
                </ParticipantInfoSummaryFieldCol1Text>
              </ParticipantInfoSummaryFieldCol1>
              <ParticipantInfoSummaryFieldCol2
                background={"rgba(39, 174, 96, 0.15)"}
              >
                <ParticipantInfoSummaryFieldCol2Text color={"#F2F2F2"}>
                  ARTUR ELZHANOV
                </ParticipantInfoSummaryFieldCol2Text>
                <ParticipantInfoSummaryFieldCol2Text2>
                  Выиграл по очкам 9–2
                </ParticipantInfoSummaryFieldCol2Text2>
              </ParticipantInfoSummaryFieldCol2>
            </ParticipantInfoSummaryField>
            <Line />
            <ParticipantInfoSummaryField>
              <ParticipantInfoSummaryFieldCol1>
                <ParticipantInfoSummaryFieldCol1Text color={"#EB5757"}>
                  Проиграл
                </ParticipantInfoSummaryFieldCol1Text>
              </ParticipantInfoSummaryFieldCol1>

              <ParticipantInfoSummaryFieldCol2
                background={"rgba(235, 87, 87, 0.15)"}
              >
                <ParticipantInfoSummaryFieldCol2Text color={"#F2F2F2"}>
                  ARTUR ELZHANOV
                </ParticipantInfoSummaryFieldCol2Text>
                <ParticipantInfoSummaryFieldCol2Text2>
                  Выиграл по очкам 9–2
                </ParticipantInfoSummaryFieldCol2Text2>
              </ParticipantInfoSummaryFieldCol2>
            </ParticipantInfoSummaryField>
            <Line />
            <ParticipantInfoSummaryField>
              <ParticipantInfoSummaryFieldCol1>
                <ParticipantInfoSummaryFieldCol1Text color={"#9B5711"}>
                  Итог
                </ParticipantInfoSummaryFieldCol1Text>
              </ParticipantInfoSummaryFieldCol1>
              <ParticipantInfoSummaryFieldCol2
                background={"rgba(255, 255, 255, 0.1)"}
              >
                <ParticipantInfoSummaryFieldCol2Text color={"#9B5711"}>
                  Бронза
                </ParticipantInfoSummaryFieldCol2Text>
              </ParticipantInfoSummaryFieldCol2>
            </ParticipantInfoSummaryField>
          </ParticipantInfoSummary>
        </Collapse>
      </EventContainer>
    </>
  )
}


export default FilterMyStories

const ParticipantInfoSummaryFieldCol1Text = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: ${({ color }) => color};
`

const MedalInfoPlace = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 48px;
  color: #fbfbfb;
`

const MedalInfoPlaceText = styled.p`
  font-family: "Inter";
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

const ParticipantInfoSummary = styled.div`
  width: 100%;
  border: 1px solid #333333;
  border-radius: 8px;
  margin: 32px 0;
`

const ParticipantInfoSummaryField = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
`

const Line = styled.div`
  border: 1px solid #333333;
  width: 100%;
`

const ParticipantInfoSummaryFieldCol1 = styled.div`
  background: #1b1c22;
  max-width: 208px;
  width: 100%;
  padding: 16px;
`

const ParticipantInfoSummaryFieldCol2 = styled.div`
  background: ${({ background }) => background};
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  padding: 16px;
  grid-template-columns: 1fr 1fr;
`

const ParticipantInfoSummaryFieldCol2Text = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: ${({ color }) => color};
`

const ParticipantInfoSummaryFieldCol2Text2 = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #828282;
`

const EventContainer = styled.div`
  width: 100%;
  padding: 32px;
  border: 1px solid #333333;
`

const EventItems = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 10fr;
`

const EventsInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-gap: 16px;
`

const EventInfoHeadingText = styled.h2`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
`

const EventInfoParticipantsInfo = styled.p`
  font-family: "Inter";
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

const PlaceIcon = ({ place }) => {
  return (
    <>
      {place === 1 && (
        <svg
          width="104"
          height="104"
          viewBox="0 0 104 104"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_3078_5650)">
            <path
              d="M41.6816 35.4992L62.4202 0H92.5352L71.7966 35.4992H41.6816Z"
              fill="#3F46F1"
            />
            <path
              d="M11.4648 0L32.2034 35.4992H62.3184L41.5798 0H11.4648Z"
              fill="#587DFF"
            />
            <path
              d="M52.0003 104C73.1324 104 90.2633 86.8691 90.2633 65.737C90.2633 44.6049 73.1324 27.474 52.0003 27.474C30.8682 27.474 13.7373 44.6049 13.7373 65.737C13.7373 86.8691 30.8682 104 52.0003 104Z"
              fill="#FAA318"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M82.2373 65.7368C82.2373 82.4367 68.6994 95.9746 51.9995 95.9746C35.2996 95.9746 21.7617 82.4367 21.7617 65.7368C21.7617 49.0369 35.2996 35.499 51.9995 35.499C68.6994 35.499 82.2373 49.0369 82.2373 65.7368ZM74.8877 65.7368C74.8877 78.3776 64.6403 88.625 51.9995 88.625C39.3587 88.625 29.1113 78.3776 29.1113 65.7368C29.1113 53.096 39.3587 42.8486 51.9995 42.8486C64.6403 42.8486 74.8877 53.096 74.8877 65.7368Z"
              fill="#FFD15C"
            />
            <path
              d="M52 49.6252L57.241 60.23L68.9308 61.9292L60.4756 70.1796L62.4615 81.8489L52 76.3418L41.5386 81.8489L43.5245 70.1796L35.0693 61.9292L46.7591 60.23L52 49.6252Z"
              fill="#FFD15C"
            />
          </g>
          <defs>
            <clipPath id="clip0_3078_5650">
              <path
                d="M0 8C0 3.58172 3.58172 0 8 0H96C100.418 0 104 3.58172 104 8V96C104 100.418 100.418 104 96 104H8C3.58172 104 0 100.418 0 96V8Z"
                fill="white"
              />
            </clipPath>
          </defs>
        </svg>
      )}
      {place === 2 && (
        <svg
          width="104"
          height="104"
          viewBox="0 0 104 104"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_3078_5677)">
            <path
              d="M41.6816 35.4992L62.4202 0H92.5352L71.7966 35.4992H41.6816Z"
              fill="#3F46F1"
            />
            <path
              d="M11.4648 0L32.2034 35.4992H62.3184L41.5798 0H11.4648Z"
              fill="#587DFF"
            />
            <path
              d="M52.0003 104C73.1324 104 90.2633 86.8691 90.2633 65.737C90.2633 44.6049 73.1324 27.474 52.0003 27.474C30.8682 27.474 13.7373 44.6049 13.7373 65.737C13.7373 86.8691 30.8682 104 52.0003 104Z"
              fill="#BABABA"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M82.2373 65.7368C82.2373 82.4367 68.6994 95.9746 51.9995 95.9746C35.2996 95.9746 21.7617 82.4367 21.7617 65.7368C21.7617 49.0369 35.2996 35.499 51.9995 35.499C68.6994 35.499 82.2373 49.0369 82.2373 65.7368ZM74.8877 65.7368C74.8877 78.3776 64.6403 88.625 51.9995 88.625C39.3587 88.625 29.1113 78.3776 29.1113 65.7368C29.1113 53.096 39.3587 42.8486 51.9995 42.8486C64.6403 42.8486 74.8877 53.096 74.8877 65.7368Z"
              fill="#EBEBEB"
            />
            <path
              d="M52 49.6252L57.241 60.2299L68.9308 61.9291L60.4756 70.1795L62.4615 81.8488L52 76.3417L41.5386 81.8488L43.5245 70.1795L35.0693 61.9291L46.7591 60.2299L52 49.6252Z"
              fill="#EBEBEB"
            />
          </g>
          <defs>
            <clipPath id="clip0_3078_5677">
              <path
                d="M0 8C0 3.58172 3.58172 0 8 0H96C100.418 0 104 3.58172 104 8V96C104 100.418 100.418 104 96 104H8C3.58172 104 0 100.418 0 96V8Z"
                fill="white"
              />
            </clipPath>
          </defs>
        </svg>
      )}
      {place === 3 && (
        <svg
          width="104"
          height="104"
          viewBox="0 0 104 104"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_3078_496)">
            <path
              d="M41.6816 35.4992L62.4202 0H92.5352L71.7966 35.4992H41.6816Z"
              fill="#3F46F1"
            />
            <path
              d="M11.4648 0L32.2034 35.4992H62.3184L41.5798 0H11.4648Z"
              fill="#587DFF"
            />
            <path
              d="M52.0003 104C73.1324 104 90.2633 86.8691 90.2633 65.737C90.2633 44.6049 73.1324 27.474 52.0003 27.474C30.8682 27.474 13.7373 44.6049 13.7373 65.737C13.7373 86.8691 30.8682 104 52.0003 104Z"
              fill="#9B5711"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M82.2373 65.7368C82.2373 82.4367 68.6994 95.9746 51.9995 95.9746C35.2996 95.9746 21.7617 82.4367 21.7617 65.7368C21.7617 49.0369 35.2996 35.499 51.9995 35.499C68.6994 35.499 82.2373 49.0369 82.2373 65.7368ZM74.8877 65.7368C74.8877 78.3776 64.6403 88.625 51.9995 88.625C39.3587 88.625 29.1113 78.3776 29.1113 65.7368C29.1113 53.096 39.3587 42.8486 51.9995 42.8486C64.6403 42.8486 74.8877 53.096 74.8877 65.7368Z"
              fill="#D7832D"
            />
            <path
              d="M52 49.6252L57.241 60.2299L68.9308 61.9291L60.4756 70.1795L62.4615 81.8488L52 76.3417L41.5386 81.8488L43.5245 70.1795L35.0693 61.9291L46.7591 60.2299L52 49.6252Z"
              fill="#D7832D"
            />
          </g>
          <defs>
            <clipPath id="clip0_3078_496">
              <path
                d="M0 8C0 3.58172 3.58172 0 8 0H96C100.418 0 104 3.58172 104 8V96C104 100.418 100.418 104 96 104H8C3.58172 104 0 100.418 0 96V8Z"
                fill="white"
              />
            </clipPath>
          </defs>
        </svg>
      )}
    </>
  )
}
